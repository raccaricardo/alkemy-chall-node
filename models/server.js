const express = require("express");
const cors = require("cors");
// var jwt = require('express-jwt');

const fileUpload = require("express-fileupload");
require("dotenv").config();
const { startConnection } = require("../database/config");
class Server {

	constructor() {
		this.app  = express();
		this.port = process.env.PORT;
		this.paths = {
			auth: "/api/auth",
			
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
		// Lectura y parseo del body para recibir siempre un json en lugar de un script  
		this.app.use( express.json() );
		// Directorio Público
		this.app.use( express.static("public") );
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
