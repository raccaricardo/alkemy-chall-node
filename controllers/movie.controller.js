const Movie  = require('../models/movie');
const Genre = require('../models/genre');
const Character = require('../models/character');
const MovieCharacter = require('../models/movie_character')
const { uploadLocalFile, deleteLocalFile } = require('../helpers')
const path = require("path");
const fs = require('fs');


const imagesFolder = 'movie';

// ! POST /
const addMovie = async( req, res ) =>{
    try {
        const { title, released, qualification, genre_id, associated_characters, associated_characters_id } = req.body;
        let image = null;
        let movie = null;
        if(req.files?.image){
            image = await uploadLocalFile(req.files, 1, undefined, imagesFolder );
            movie = await Movie.create({ title, released, qualification, image: image[0], genre_id });
            await movie.save();
        }else{
            movie = await Movie.create({ title, released, qualification, image: null, genre_id });
            await movie.save();
        }

        if(typeof associated_characters == 'string'){
            associated_movies = JSON.parse(associated_movies);
            const { name, age, weight, history } = associated_characters;
            const character = await Character.create({  name, age, weight, history });
            const movie_character = MovieCharacter.create({ movie_id: movie.id, character_id: character.id });
        }else{
            for(let i = 0; i < associated_characters?.length; i++) {
                associated_characters[i] = JSON.parse(associated_characters[i]);
                const {  name, age, weight, history } = associated_characters[i];
                const character = await Character.create({  name, age, weight, history });
                const movie_character = MovieCharacter.create({ movie_id: movie.id, character_id: character.id });
            }
        }

        res.status(201).send({ ok: true, movie, message: 'Movie added successfully' });

    } catch (error) {
        console.log(error);
       
        return res.status(500).json({ok: false, error, msg: 'something went wrong'});
    }
}
// ! GET /movies filtered
const listMovies = async( req, res ) =>{
    try {
        const { name, order, genre } = req.query;
        let movies = null;
        if( name && order && genre){
            movies = await Movie.findAll( { 
                where: { name, genre_id: genre },
                order: [
                    'released', order
                ]
            } );
            return res.status(200).json({ok: true, movies});
        }
        if( name ){ 
            movies = await Movie.findAll( { where: { name} } );
        }
        if( genre ){ 
            movies = await Movie.findAll( { where: { genre_id: genre } } );
        }
        if(order){ 
            movies = await Movie.findAll( { 
                order: [ ['released', order ] ]
            } );
        }

        movies = await Movie.findAll( { 
            attributes: [ 'title', 'image', 'released' ]
        } );
        
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
                const filePath = path.join(__dirname,movie.image);
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