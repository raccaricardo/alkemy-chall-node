const { Router } = require('express');
const { check, body } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');


const { 
    addCharacter,
    deleteCharacter,
    editCharacter,
    getCharacters,
    getCharacter    
}= require('../controllers/character.controller.js');


const router = Router();

router.post('/', [
    validateJWT,
    body('name').not().isEmpty().trim().escape(),
    validateFields
], addCharacter);
router.get('/characters', getCharacters);
router.get('/:id', [
    check('id', 'id is required').notEmpty(),
    validateFields
], getCharacter);

router.put('/:id', editCharacter);
router.put('/list', getCharacters);


router.delete('/:id', [
    validateJWT,
    check('id', 'id is required').notEmpty(),
    validateFields
], deleteCharacter);



module.exports = router;