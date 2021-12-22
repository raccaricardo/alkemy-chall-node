const { sequelize } = require('../database/config.js');
const { DataTypes } = require('sequelize');

const Character = sequelize.define('Character', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
    autoIncrement: true
    primaryKey: true
},
name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
age: { type: DataTypes.DATE },

weight:{type: DataTypes.DECIMAL(10,2)},

history: { type: DataTypes.STRING },

image:{ type: DataTypes.STRING },


, {
  // Other model options go here
    timestamps: false,
});
// Character.associate = function(models) {
//   // associations can be defined here
//    Character.hasMany(models.Movie, { 
//         as: 'chars',
//         through: 'movie_character',
//         foreignKey: 'character_id'
//    });

// }


module.exports = Character;