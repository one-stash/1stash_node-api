const multer = require('multer');
const {CustomStorage} = require('./engine');

var fileStorage = CustomStorage(
  {
    filename: (req, file, next)=>{
      return req.body.filename;
    }
  }
);
module.exports = multer({storage: fileStorage});
