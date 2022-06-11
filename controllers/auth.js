
const { response }  = require ('express');
const bcrypt        = require('bcryptjs');

const User          = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const newUser = async (req, res = response) => {


   try {
        const { email, password } = req.body;

        // check if email exists
        const existsEmail = await User.findOne( {email});
        if ( existsEmail ) {
            return res.status(400).json({
                ok: false,
                msg: "Email already exists"
            });
        }
      
        const user = new User(req.body);

        //encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );  

        // Save user
        await user.save();

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
           user,
           token
        })
    
   } catch (error) {
       console.log(error);
       res.status(500).json({
         ok: false, 
         msg: "Talk to administrator"  
       })
   }
}


const login = async (req, res = response) => { 

  
    const {email, password} = req.body; 

    res.json ({
        ok: true, 
        msg: 'login',
        email, 
        password
    });

}

const renewToken = async (req, res = response) => {

    res.json ({
        ok: true, 
        msg: 'renewToken'
    });

}

module.exports = {
    newUser,
    login,
    renewToken
}