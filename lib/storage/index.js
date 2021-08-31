const multer = require('multer');
const {CustomStorage} = require('./engine');


module.exports = multer({
  storage: CustomStorage()
});
