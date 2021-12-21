var jwt = require("jsonwebtoken");
const User = require("../models/user");

//usualmente los jwt se mandan en los headers, no como parametros
const validateJWT = async ( req, res, next ) => {

	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			token,
			msg: "Token not received"
		});
	}
	try {
		const { uid } = jwt.verify(token, process.env.JWT_SECRET);
		req.uid = uid; 
		const user = await User.findAll({ where: { id: uid } });

		if ( !user ) {
			return res.status(401).json({
				msg: "invalid token - invalid user"
			});
		}else{
			req.user = user;
		}
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "invalid token"
		});
	}
	//find and compare user-token from user-db
	// req.uid = uid;
};
module.exports = {
	validateJWT
};