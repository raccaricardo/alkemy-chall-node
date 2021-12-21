const { Router } = require('express');
const { check } = require('express-validator');

const { userExistById } = require('../middlewares/dbValidators');

const router = Router();
const { 
    createUser,
    editUser,
    getUser,
    getUsers,
    loginUser,
    unsubscribeUser
}= require('../controllers/user.controller.js');

const { validateFields, validateJWT } = require('../middlewares');
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

router.post('/register', createUser);
router.put('/edit/:id', [
    validateJWT,
    check('id', 'id is required').notEmpty(),
    check("id").custom(userExistById),
    validateFields
    ],  
editUser);
router.delete('/:id', [
    validateJWT,
    check("id").custom(userExistById),

    validateFields
], unsubscribeUser);


module.exports = router;