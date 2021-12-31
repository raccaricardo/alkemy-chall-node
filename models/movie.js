const { sequelize } = require('../database/config.js');
const { DataTypes } = require('sequelize');
const Character = require('./character.js');
const Genre = require('./genre.js');

const Movie = sequelize.define('Movie', {
  // Model attributes are defined here
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
released: { type: DataTypes.DATE },
qualification: { type: DataTypes.INTEGER },

image:{ type: DataTypes.STRING },

genre_id:{type: DataTypes.INTEGER}
},
{
  // Other model options go here
    timestamps: false,
});
// Movie.belongsToMany(Character, { through: 'movie_character' });
// Movie.associate = function(models) {
//   // associations can be defined here
//    Movie.hasMany(models.Character, { 
//         as: 'movies',
//         through: 'movie_character',
//         foreignKey: 'movie_id'
//    });
//    Movie.hasOne(Genre, { 
//         as: 'genres',
//         foreignKey: 'genre_id',    
//     })
// }


module.exports = Movie;