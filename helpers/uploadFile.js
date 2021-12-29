const path = require("path");
const fs = require('fs');
const { v4 : uuidv4 } = require('uuid');


const uploadLocalFile = async (files, limitFiles = 3, validExtensions = ["png", "jpg", "jpeg", "gif"], folderName = "", baseFolder = "../uploads/") =>
{
	return new Promise((resolve, reject) =>
	{
    if(!files){
		return reject('No files were uploaded');  
    }
		let savedFiles = [];
		let finalFileName;
		let uploadPath;
		let fileExtension;
		let fileName;
		// The name of the input field (i.e. "file") is used to retrieve the uploaded file
		Object.entries(files).forEach(([key, file], index) =>
		{
			// console.log(key + ": " + index)
			fileName = file.name.split(".");
			fileExtension = fileName.pop();
			finalFileName =`${uuidv4()}.${fileName}.${fileExtension}`;
			// console.log({finalFileName});
			uploadPath = path.join(__dirname, baseFolder, folderName, finalFileName);

			savedFiles.push(`${baseFolder}/${folderName}/${finalFileName}`);

			// Validate Extensions 
			if (!validExtensions.includes(fileExtension)) {
				savedFiles.pop();
				return reject(`file extension:"${fileExtension}" not allowed. Valid extensions: ${validExtensions}`);
			}
			// Use the mv() method to place the file somewhere on your server
			file.mv(uploadPath, function (err)
			{
				if (err) {
					savedFiles.pop();
					console.log(`Error to upload file: ${err}`);
					return reject(savedFiles,err);
				}
			});
			if (limitFiles !== 0 && limitFiles == index + 1) { resolve(savedFiles); }


		});
		resolve(savedFiles);

	});
};

const deleteLocalFile = async (filesPath = [])=>{
	if(filesPath = []){
		return;
	}
	filesPath.forEach(file =>{
		const filePath = path.join(__dirname,file);
		console.log(filePath);
		fs.unlink(filePath, function(err){
			clg.log("delete completed");
			if(err) throw err;
		})
	} );

}
module.exports = { 
	uploadLocalFile,
	deleteLocalFile
};