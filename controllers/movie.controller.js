const Movie  = require('../models/movie');
const Genre = require('../models/genre');
const { uploadLocalFile, deleteLocalFile } = require('../helpers')
const path = require("path");
const fs = require('fs');


const imagesFolder = 'movie';

// ! POST /
const addMovie = async( req, res ) =>{
    try {
        const { title, released, qualification, genre_id } = req.body;
        if(req.files?.image){
            const image = await uploadLocalFile(req.files, 1, undefined, imagesFolder );
            console.log(`image uploaded ${image}`);
            const movie = await Movie.create({ title, released, qualification, image: image[0], genre_id });
            await movie.save();
            res.status(201).send({ ok: true, movie, message: 'Movie added successfully' });
        }
        const movie = await Movie.create({ title, released, qualification, image: null, genre_id });
        
        await movie.save();
        res.status(201).send({ ok: true, movie, message: 'Movie added successfully' });

    } catch (error) {
        console.log(error);
        if( error?.errors[0].origin === 'DB'){
            return res.status(400).json({ok: false, error, msg: 'Validation error'});
        }
        res.status(500).json({ok: false, error, msg: 'something went wrong'});
    }
}
// ! GET /list 
const listMovies = async( req, res ) =>{
    try {

        const movies = await Movie.findAll({
            // include: [{
            //     model: Genre,
            //     as: 'genres'
            // }]
            // include: Genre
        });
        
        res.status(200).send({ ok: true, movies, message: 'Movies list' });
    }catch (error) {
        console.log(error);
        res.status(500).json({ok: false, error, msg: 'something went wrong'});
    }
}
// ! PUT/:id
const editMovie = async( req, res ) =>{
    try {
        const { id } = req.params;
        const { title, released, qualification, genre_id } = req.body;
        const movie = await Movie.findByPk(id);
        if(!movie){
            return res.status(404).json({ok: false, msg: 'Movie not found'});
        }

        if(req.files?.image){
            const image = await uploadLocalFile(req.files, 1, undefined, imagesFolder );
            
            if(movie.image){
                const filePath = path.join(__dirname,movie.image);
                fs.unlink(filePath, function(err){
                    if(err) throw err;
                })
            }
            
            await movie.update({ title, released, qualification, image: image[0], genre_id });
            res.status(200).send({ ok: true, message: 'Movie updated successfully' });
        }

    }catch (error) {
        console.log(error);
        res.status(500).json({ok: false, error, msg: 'something went wrong'});
    }


}
// ! DELETE/:id
const deleteMovie = async( req, res ) =>{
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if(!movie){
            return res.status(404).json({ok: false, msg: 'Movie not found'});
        }
        if(movie.image){
                const filePath = path.join(__dirname,genre.image);
                fs.unlink(filePath, function(err){
                    if(err) throw err;
                })
            }
        await movie.destroy();
        res.status(200).send({ ok: true, message: 'Movie deleted successfully' });
    }catch (error) {
        console.log(error);
        res.status(500).json({ok: false, error, msg: 'something went wrong'});
    }
}

module.exports = {
    addMovie,
    deleteMovie,
    editMovie,
    listMovies,
}