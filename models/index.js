const Character = require("./character");
const Genre = require("./genre");
const Movie = require("./movie");
const Movie_Character = require("./movie_character");
const User = require("./user");

Movie.belongsTo(Genre, { foreignKey : "genre_id" });
// Genre.hasMany(Movie, { foreignKey : "genre_id"});

// Movie.belongsToMany(Character, { through: 'Movie_Character'});
// Character.belongsToMany(Movie, { through: 'Movie_Character'});

Movie_Character.hasMany(Movie, { foreignKey : "movie_id" });
Movie_Character.hasMany(Character, { foreignKey : "character_id" });


module.exports = {
    Character,
    Genre,
    Movie,
    Movie_Character,
    User
}