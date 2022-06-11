/**
 * 
 * path: api/login
 */

const { Router } = require("express");
const { check } = require("express-validator");

// Controllers
const { newUser, login, renewToken } = require('../controllers/auth');
const { checkFields } = require("../middlewares/check-fields");


const router = Router();

router.post( '/new',[
    check('email', 'email is mandatory').not().isEmpty(),
    check('email', 'email format is wrong').isEmail(),
    check('password', 'password is mandatory').not().isEmpty(),
    check('name', 'name is mandatory').not().isEmpty(),
   
    checkFields

],newUser);


// login
router.post('/',[
    check('email', 'email is mandatory').isEmail(),
    check('password', 'password is mandatory').not().isEmpty(),
    checkFields

] ,login);

// revalidar token
router.get('/renewToken', renewToken);


module.exports = router;