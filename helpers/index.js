const generateJWT = require('./generateJWT');
const encrypt = require('./encrypt');

module.exports = {
    ...generateJWT,
    ...encrypt
}