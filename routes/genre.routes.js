const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, userExistById, genreExistById } = require('../middlewares');

const { addGenre, deleteGenre, editGenre, getGenre, getGenres } = require('../controllers/');

const router = Router();

router.post('/', [
    check('name', 'genre name is required').notEmpty(),
    // check('name', 'genre name exist').custom(genreExistByName),
    validateFields
], addGenre);
router.get('/list', getGenres);
router.delete('/:id', [
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