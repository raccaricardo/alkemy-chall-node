const express = require("express");
const cors = require("cors");
// var jwt = require('express-jwt');
const bodyParser = require('body-parser');
const multer = require('multer');
const fileUpload = require("express-fileupload");
require("dotenv").config();

const upload = multer();
const { startConnection } = require("../database/config");
class Server {

	constructor() {
		this.app  = express();
		this.port = process.env.PORT;
		this.paths = {
			auth: "/api/auth",
			genre: "/api/genre",
			
		};
        
		this.connectDB();
		// Middlewares
		this.middlewares();
		// Rutas de mi aplicación
		this.routes();
	}

	middlewares() {
		// CORS
		this.app.use( cors() );
		// for parsing application/json in replace of scripts
		this.app.use( express.json() );
		//form data
		this.app.use(upload.array()); 
		// Directorio Público
		this.app.use( express.static("public") );
		// for parsing application/xwww-
		this.app.use(bodyParser.urlencoded({ extended: true }));
		// FileUpload

		// JWT
		// this.app.use( jwt({ secret: 'shhhhhhared-secret', algorithms: ['HS256'] }),
  		// function(req, res) {
		// 	if (!req.headers){ 
		// 		console.log(req.headers);
		// 		return res.sendStatus(401)
		// 		};
		// 		res.sendStatus(200);
  		// 	});		
	}
	routes() {
		this.app.use( this.paths.auth, require("../routes/auth.routes") );
		this.app.use( this.paths.genre, require("../routes/genre.routes") );

		


	}
    
	async connectDB(){
        await startConnection();
	}

	listen() {
		this.app.listen( this.port, () => {
			console.log("todo ok. Port: " + this.port);
		});
	}

}




module.exports = Server;
