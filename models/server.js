const express = require("express");
const hbs = require('hbs');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
require("dotenv").config();



const fileUpload = require('express-fileupload');

const { startConnection } = require("../database/config");

class Server {

	constructor() {
		this.app  = express();
		this.port = process.env.PORT;
        
		//set view engine handlebars
		this.app.set('view engine', 'hbs');
		this.paths = {
			auth: "/api/auth",
			genre: "/api/genre",
			character: "/api/character",
			movie: "/api/movie"
			
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
		this.app.use(fileUpload({
			createParentPath: true,
			// useTempFiles: true
		}));
		// Directorio Público
		this.app.use( express.static("public") );
		// for parsing application/xwww-
		this.app.use(bodyParser.urlencoded({ extended: true }));
		 
	}
	routes() {
		// this.app.use('/', (req,res) => {
		// 	res.render('../views/home.hbs');
		// })
		// this.app.use('/',require('../routes/index.routes'));
		this.app.use( this.paths.auth, require("../routes/auth.routes") );
		this.app.use( this.paths.genre, require("../routes/genre.routes") );
		this.app.use( this.paths.character, require("../routes/character.routes") );
		this.app.use( this.paths.movie, require("../routes/movie.routes") );

		


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
