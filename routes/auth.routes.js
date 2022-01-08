const { Router } = require('express');
const { check } = require('express-validator');


const { 
    createUser,
    editUser,
    getUser,
    getUsers,
    loginUser,
    unsubscribeUser
}= require('../controllers/user.controller.js');

const { validateFields, validateJWT, userExistById } = require('../middlewares');

const router = Router();

router.get('/login',[
    check('email', 'email is required').notEmpty(),
    check('email', 'email invalid').isEmail(),
    check("password", "password field can't be empty").notEmpty(),
	check("password", "password must be at least 6 charset").isLength(6),
    validateFields
], loginUser);
router.get('/', getUsers);
router.get('/:id',[
    check('id', 'id is required').notEmpty(),
    validateFields
],
getUser);

router.post('/register', [
    check('email', 'email is required').notEmpty(),
    check('password', 'password is required').notEmpty(),
    validateFields
], createUser);
router.put('/edit/:id', [
    validateJWT,
    check('id', 'id is required').notEmpty(),
    validateFields
    ],  
editUser);
router.delete('/:id', [
    validateJWT,
    validateFields
], unsubscribeUser);


module.exports = router;