const { Router } = require('express');
const { check, body } = require('express-validator');


const { 
    addCharacter,
    deleteCharacter,
    editCharacter,
    getCharacters,
    getCharacter    
}= require('../controllers/character.controller.js');

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/', [
    body('name').not().isEmpty().trim().escape(),
    validateFields
], addCharacter);
router.get('/list', getCharacters);
router.get('/:id', [
    check('id', 'id is required').notEmpty(),
    validateFields
], getCharacter);

router.put('/:id', editCharacter);

router.delete('/:id', [
    check('id', 'id is required').notEmpty(),
    validateFields
], deleteCharacter);



module.exports = router;