const generateJWT = require('./generateJWT');
const encrypt = require('./encrypt');
const uploadFile = require('./uploadFile');
module.exports = {
    ...generateJWT,
    ...encrypt,
    ...uploadFile
}