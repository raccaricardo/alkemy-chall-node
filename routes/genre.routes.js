const { Router } = require('express');
const { check } = require('express-validator');

const path = require ('path');

const { validateFields, validateJWT } = require('../middlewares');

const { addGenre, deleteGenre, editGenre, getGenre, getGenres } = require('../controllers/');

const router = Router();

router.post('/', 
[
    validateJWT,
    check('name', 'genre name is required').notEmpty(),
    validateFields
], addGenre);
router.get('/list', getGenres);
router.delete('/:id', [
    validateJWT,    
    check('id', 'gender id is required').notEmpty(),
    validateFields
], deleteGenre);
router.put('/:id', [
    check('id', 'gender id is required').notEmpty(),
    validateFields
], editGenre);
router.get('/:id', [
    check('id', 'gender id is required').notEmpty(),
    validateFields
], getGenre);

module.exports = router;