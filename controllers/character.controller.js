const Character  = require('../models/character');
const { uploadLocalFile, deleteLocalFile } = require('../helpers')
const path = require("path");
const fs = require('fs');

const imagesFolder = 'character';
// ! POST
const addCharacter = async( req,res ) => {
    try{
        const { name, age, weight, history } = req.body;
        if(req.files?.image){
            const image = await uploadLocalFile(req.files, 1, undefined, imagesFolder );
            console.log(`image uploaded ${image}`);
            await Character.create({ name, age, weight, history, image: image[0] });
            res.status(201).send({ ok: true, message: 'Character added successfully' });
        }
        const character = await Character.create({ name, age, weight, history, image: null });
        await character.save();

        res.status(201).send({ ok: true, character, message: 'Character added successfully' });

    }catch(err){
        console.log(err);
        // if(error?.message == "Validation error"){
        //     return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        // }
        if( err?.errors[0].origin === 'DB'){
            return res.status(400).json({ok: false, err, msg: 'Validation error'});
        }
        res.status(500).json({ok: false, err, msg: 'something went wrong'});

    }
}
// ! PUT
const editCharacter = async( req, res ) => {
    try{
        const { id } = req.params;
        let { name, age, weight, history } = req.body;
        const character = await Character.findByPk(id);
        if(!character){
            res.status(404).json({ok: true, msg: 'character id not found'});
        }
        if(req.files?.image){
            //     save image
            let image = await uploadLocalFile(req.files, 1, undefined, imagesFolder );
            
            // DELETE IF there is any image saved 
            if(character.image){
                const filePath = path.join(__dirname,character.image);
                fs.unlink(filePath, function(err){
                    if(err) throw err;
                })
            }
            // UPDATE char
            if(name == character.name){
                await Character.update({ 
                    age: character.age || age, 
                    weight: character.weight || weight, 
                    history: character.history || history, 
                    image: image[0] 
                    }, { where: {id} } 
                );
            }else{
                await Character.update({ 
                    name: name || character.name,
                    age: character.age || age, 
                    weight: character.weight || weight, 
                    history: character.history || history, 
                    image: image[0] 
                    }, { where: {id} } 
                );
            }
            

        }
        return res.status(200).send({ ok: true, message: 'Character updated successfully' });

    }catch(err){
        console.log(err);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ok: false, msg: 'something went wrong'});
    }
}
// ! DELETE
const deleteCharacter = async( req,res ) => {
    try{
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if(!character){
            res.status(404).json({ok: false, msg: 'character id not found'});
        }
        if(character.image){
            const filePath = path.join(__dirname,character.image);
            fs.unlink(filePath, function(err){
                if(err) throw err;
            })
        }
        await Character.destroy({where: {id}});
        res.status(200).send({ ok: true, message: 'Character deleted successfully' });
    }catch(err){
        console.log(err);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ok: false, msg: 'something went wrong'});
    }
}
// ! GET LIST filtered
const getCharacters = async( req,res ) => {
    try{
        const { name, age, movie } = req.query;
        let characters = null;
        let list = [];
        // # filter by name, age and movie associated
        if( name && age && movie){
            characters = Movie_Character.findAll({
                attributes: ['character_id' ],
                where: { movie_id: movie }
            })
            for(let i = 0; i < characters.length; i++){
                const char = await Character.findOne( { 
                    where: { id: characters[i].character_id, name, age }
                });
                if(char){
                    list.push(char);
                }
            }
            return res.status(200).json({ok: true, characters: list});
        }
        // # filter by name
        if(name && !age && !movie){
            characters = await Character.findAll( { 
                    where: { name }
                });
            return res.status(200).json({ok: true, characters: characters});
        }
        // # filter by age
        if( age && !name && !movie){
            characters = await Character.findAll( { 
                    where: { age }
                });
            return res.status(200).json({ok: true, characters });
        }
        // # filter by movie
        if( !age && !name && movie){
            characters = Movie_Character.findAll({ where: { movie_id: movie } });
            list = [];
            for(let i = 0; i < characters.length; i++){
                const char = await Character.findByPk( characters[i].character_id );
                if(char){
                    list.push(char);
                }
            }
            return res.status(200).json({ok: true, characters: list});
        }
        if(!name && age && movie){
            characters = Movie_Character.findAll({ where: { movie_id: movie } });
            list = [];
            for(let i = 0; i < characters.length; i++){
                const char = await Character.findOne( { 
                    where: { id: characters[i].character_id, age }
                });
                if(char){
                    list.push(char);
                }
            }
            return res.status(200).json({ok: true, characters: list});
        }
        characters = await Character.findAll();
        res.status(200).send({ ok: true, characters });
    }catch(err){
        console.log(err);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ok: false, msg: 'something went wrong'});
    }
}
// ! GET BY ID
const getCharacter = async( req,res ) => {
    try{

        const { id } = req.params;
        let character = await Character.findByPk(id);
        if(!character){
            res.status(404).json({ok: false, msg: 'character id not found'});
        }
        character.image = path.join(__dirname,character.image);
        res.status(200).send({ ok: true, character });

    }catch(err){
        console.log(err);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ok: false, msg: 'something went wrong'});
    }
}

module.exports = {
    addCharacter,
    deleteCharacter,
    editCharacter,
    getCharacters,
    getCharacter
}