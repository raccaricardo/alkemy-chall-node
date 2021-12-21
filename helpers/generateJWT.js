var jwt = require("jsonwebtoken");

const generateJWT = (uid = "") =>{
    
	return new Promise( (resolve, reject) => {

		const payload = { uid };

		jwt.sign(payload, process.env.JWT_SECRET,{
			expiresIn: "4h"//expires in 4 hours
		},(err, token) =>{
			if( err ){
				console.log(err);
				reject("Token can't be generated");
			}else{
				resolve(token);
			}
		});


	});



};

module.exports = { 
	generateJWT

};