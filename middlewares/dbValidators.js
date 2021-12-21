const { User } = require('../models/');

const userExistById = async(id= "") =>{
    if(id == ""){
	const userExist = await User.findByPk( id );
    if(!userExist){
		throw new Error(`User Id ${id} doesn't exist`);

    }
	// console.log(userExist);
	
	}
}


module.exports = {
    userExistById
};