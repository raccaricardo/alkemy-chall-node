const { User, Genre } = require('../models');

const userExistById = async(id= "") =>{
    if(id == ""){
	const userExist = await User.findByPk( id );
    if(!userExist){
		throw new Error(`User Id ${id} doesn't exist`);

    }
	// console.log(userExist);
	
	}
}
 
const genreExistById = async(id= "") =>{
    if(id !== ""){
	// const userExist = await User.findByPk( id );

	const userExist = await User.findByPk( id );
    console.log(userExist.msg);
    console.log({userExist});

    // if(!userExist){
	// 	throw new Error(`User Id ${id} doesn't exist`);

    // }
	// console.log(userExist);
	
	}
}


module.exports = {
    userExistById,
    genreExistById,
 };