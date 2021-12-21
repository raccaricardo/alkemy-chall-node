

const validateJWT = require("./validateJWT");
const validateFields = require("./validateFields");
const dbValidators = require('./dbValidators');
module.exports = {
	...validateJWT,
	...validateFields,
	...dbValidators
};