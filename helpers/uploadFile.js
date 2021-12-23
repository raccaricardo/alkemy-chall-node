// const fileUpload = require('express-fileupload');
const multer = require('multer');

const uploadLocalFile = async ( files, mainDir, subDir = "" )=>{
    
    const upload = multer({ dest: `uploads/${mainDir}/${subDir}`}).single('image');
    
    const sampleFile = files.image;
    const uploadPath =` ${__dirname} + /${mainDir}/${subDir} + sampleFile.name`;
    const cpUpload = upload.single("image");
    upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  })
    return uploadPath;
}

module.exports = { uploadLocalFile };