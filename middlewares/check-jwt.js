const jwt = require('jsonwebtoken');
const { restart } = require('nodemon');

const checkJWT = (req, res, next) => {

    try {

        const token = req.header('x-token'); 

        if(!token) {
            res.status(401).json({
                ok:false,
                msg: 'There is not token'
            })
        }

        const  { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
          

        next();
        
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }
}


module.exports = {
     checkJWT
}