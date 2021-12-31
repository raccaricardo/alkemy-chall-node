const Genre  = require('../models/genre');
const { uploadLocalFile, deleteLocalFile } = require('../helpers')
const path = require("path");
const fs = require('fs');

const imagesFolderName = 'genre';
// ! POST
const addGenre = async( req,res ) => {
    try {
        const { name } = req.body;
        if (req.files?.image) {
            const image = await uploadLocalFile(req.files, 1, undefined, imagesFolder );
            const genre = await Genre.create({ name, image });
            await genre.save();
            res.status(201).send({ ok: true, genre, message: 'Movie added successfully' });
		}
     

        const genre = await Genre.create({ name });
        await genre.save();
        res.status(201).send({ ok: true, genre, message: 'Genre added successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }else{
        return res.status(500).send({ ok: false, message: 'Error in adding genre', error: error.message });
        }
    }
}
// ! PUT
const editGenre = async( req,res ) => {
    try {

        const { id } = req.params;
        const { name } = req.body;
        const genre = await Genre.findByPk(id);
        if(!genre){
            res.status(404).json({ok: false, msg: 'gender id not found'});
        }
        let image = null;
        if(req.files?.image){
            image = await uploadLocalFile(req.files, 1, undefined, imagesFolderName);
            
            if(genre.image){
                const filePath = path.join(__dirname,genre.image);
                fs.unlink(filePath, function(err){
                    if(err) throw err;
                })
            }

            await Genre.update({ name, image: image[0] }, {where: {id}});
            return res.status(200).send({ ok: true, message: 'Genre updated successfully' });

        }else{
            await Genre.update({ name }, {where: {id}});
            res.status(200).send({ ok: true, message: 'Genre updated successfully' });

        }
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
        if(genreExist.image){
                const filePath = path.join(__dirname,genre.image);
                fs.unlink(filePath, function(err){
                    if(err) throw err;
                })
            }
        const genre = await Genre.destroy({where: {id}});
        res.status(200).send({ ok: true, message: 'Genre deleted successfully' });
    } catch (error) {
        console.log(error);
        if(error?.message == "Validation error"){
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