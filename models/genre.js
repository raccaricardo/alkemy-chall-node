const { sequelize } = require('../database/config.js');
const { DataTypes } = require('sequelize');

const Genre = sequelize.define('Genre', {
  // Model attributes are defined here
id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
image: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
}, {
  // Other model options go here
    timestamps: false
});

// Genre.associate = function (models) {
//         Genre.hasMany(models.Movie, {
//             as: 'movies',
//             foreignKey: 'genre_id'
//         })
// }

module.exports = Genre;