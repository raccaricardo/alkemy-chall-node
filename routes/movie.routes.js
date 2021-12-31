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

router.post('/', addMovie);
router.get('/list', listMovies);
router.delete('/:id', deleteMovie);
router.put('/:id', editMovie);


module.exports = router;