const Genre = require("./genre");
const Movie = require("./movie");
const Movie_Character = require("./movie_character");
const User = require("./user");

Movie.belongsTo(Genre, { foreignKey : "genre_id" });
Genre.hasMany(Movie, { foreignKey : "genre_id"});

module.exports = {
    Genre,
    Movie,
    Movie_Character,
    User
}