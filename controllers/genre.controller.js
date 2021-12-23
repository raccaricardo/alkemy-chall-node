const Genre  = require('../models/genre');
const { uploadLocalFile } = require('../helpers')
// ! POST
const addGenre = async( req,res ) => {
    try {
        const { name } = req.body;
        let imageDir = null;
        console.log(req.file);
        const genre = await Genre.create({ name });
        await genre.save();
        res.status(201).send({ ok: true, genre, message: 'Genre added successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).send({ ok: false, message: 'Error in adding genre', error: error.message });
    }
}
// ! PUT
const editGenre = async( req,res ) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const genreExist = await Genre.findByPk(id);
        if(!genreExist){
            res.status(404).json({ok: false, msg: 'gender id not found'});
        }
        const genre = await Genre.update({ name }, {where: {id}});
        res.status(200).send({ ok: true, message: 'Genre updated successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).send({ ok: false, message: 'Error in updating genre', error: error.message });
    }
}
// ! DELETE
const deleteGenre = async( req,res ) => {
    try {
        const { id } = req.params;
        const genreExist = await Genre.findByPk(id);
        if(!genreExist){
            res.status(404).json({ok: false, msg: 'gender id not found'});
        }
        const genre = await Genre.destroy({where: {id}});
        res.status(200).send({ ok: true, message: 'Genre deleted successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).send({ ok: false, message: 'Error in deleting genre', error: error.message });
    }
}
// ! GET
const getGenres = async( req,res ) => {
    try {
        const genres = await Genre.findAll();
        res.status(200).send({ ok: true, genres, message: 'Genres retrieved successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).send({ ok: false, message: 'Error in retrieving genres', error: error.message });
    }
}
// ! GET
const getGenre = async( req, res ) => {
    try {
        const genre = await Genre.findByPk(req.params.id);
        res.status(200).send({ ok: true, genre, message: 'Genre retrieved successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).send({ ok: false, message: 'Error in retrieving genre', error: error.message });
    }
        
}


module.exports = {
    addGenre,
    deleteGenre,
    editGenre,
    getGenre,
    getGenres
}