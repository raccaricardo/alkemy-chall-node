const userController = require('./user.controller.js');
const genreController = require('./genre.controller.js');


module.exports = {
    ...userController,
    ...genreController,
}