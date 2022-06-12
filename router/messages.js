/**
 * 
 * Path : api/messages
 */

const { Router }    = require('express');
const { checkJWT }  = require('../middlewares/check-jwt');
const { getChat }   = require('../controllers/messages');

const router = Router();

router.get('/:from', checkJWT, getChat)

module.exports = router;
