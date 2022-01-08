const { sequelize } = require('../database/config.js');
const { DataTypes } = require('sequelize');

const Movie_Character = sequelize.define('Movie_Character', {
  // Model attributes are defined here
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
movie_id: {
    type: DataTypes.INTEGER,
},
character_id: { 
    type: DataTypes.INTEGER
}
}, {
  // Other model options go here
    timestamps: false,
    tableName: 'movie_character'
});

Movie_Character.associate = function(models) {
    Movie_Character.hasMany(models.Character, {
        as: 'chars',
        foreignKey: 'character_id'
    })
}
Movie_Character.associate = function(models) {
    Movie_Character.hasMany(models.Movie, {
        as: 'movies',
        foreignKey: 'movie_id'
    })
}

module.exports = Movie_Character;