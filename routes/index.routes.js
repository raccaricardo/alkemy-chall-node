const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();

router.get('/', [
], (req,res)=>{
    console.log("Hola index main");
    res.render('../views/home', {title: 'Challengue alkemy', content: 'Te estoy pasando cosas'});
});

module.exports = router;