const { Router } = require('express');
const { check, body } = require('express-validator');


const { 
    addMovie,
    deleteMovie,
    editMovie,
    listMovies,
}= require('../controllers/movie.controller.js');

const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.post('/',[ 
    validateJWT, 
    check('id', 'id is required').notEmpty(),
    check('title', 'title is required').notEmpty(),
    check('genre_id', 'genre_id is required').notEmpty(),
    validateFields
], addMovie);
router.get('/movies', listMovies);
router.put('/:id', [ 
    validateJWT, 
    check('id', 'id is required').notEmpty(),
    validateFields
], editMovie);
router.delete('/:id',[ 
    validateJWT, 
    check('id', 'id is required').notEmpty(),
    validateFields
], deleteMovie);


module.exports = router;