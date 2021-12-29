const { Router } = require('express');
const { check, body } = require('express-validator');


// const { 
    
// }= require('../controllers/movie.controller.js');

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();


router.get('/', ( req, res )=>{
    res.json({msg:"Hola"});
 });


module.exports = router;