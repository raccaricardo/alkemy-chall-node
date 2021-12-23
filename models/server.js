const express = require("express");
const hbs = require('hbs');
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
require("dotenv").config();
const { startConnection } = require("../database/config");
const multer = require('multer');
// set storage for upload images with multer


class Server {

	constructor() {
		this.app  = express();
		this.port = process.env.PORT;
        
		//set view engine handlebars
		this.app.set('view engine', 'hbs');
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
		// this.app.use(upload.array()); 
		// Directorio Público
		this.app.use( express.static("public") );
		// for parsing application/xwww-
		this.app.use(bodyParser.urlencoded({ extended: true }));
		const storage = multer.diskStorage({
			destination: ( req, file, cb)=>{
				cb(null, '../uploads/');
			},
			filename: ( req, file, cb)=>{
				console.log(file);
				cb(null, Date.now() +"-" + path.extname(file.originalname)  )
			}
		})
		this.app.use(multer(( 
			storage
			dest: path.join(__dirname, 'uploads')
		).single('image')));
		// FileUpload

		// this.app.use(multer({ 
		// 	dest: 'uploads'
		// }).single('image'));
		// this.app.use(fileUpload({
		// 	useTempFiles : true,
		// 	tempFileDir : '/tmp/'
		// }));
	}
	routes() {
		// this.app.use('/', (req,res) => {
		// 	res.render('../views/home.hbs');
		// })
		this.app.use('/',require('../routes/index.routes'));
		this.app.use( this.paths.auth, require("../routes/auth.routes") );
		this.app.use( this.paths.genre, upload.single("image"), require("../routes/genre.routes") );

		


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
