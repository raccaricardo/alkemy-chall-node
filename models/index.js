const Genre = require("./genre");
const Movie = require("./movie");
const Movie_Character = require("./movie_character");
const User = require("./user");



module.exports = {
    ...Genre,
    ...Movie,
    ...Movie_Character,
    ...User
}