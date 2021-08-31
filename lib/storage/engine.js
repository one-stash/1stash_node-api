const fs = require('fs')
const mime = require('mime');
const processToken = require('@lib/onedrive').process;
const oneDriveAPI = require('onedrive-api');

function CustomStorage () {}


CustomStorage.prototype._handleFile = function _handleFile (req, file, cb) {
    
    var onedrive_folder = req.body.onedrivefolder+'/' || '';
    var onedrive_filename = req.body.file_name ? req.body.file_name.replace(' ', '-') + '.' + file.originalname.split('.').pop() : file.originalname.replace(' ', '-');
    var path = './temp/' + onedrive_filename;
    var outStream = fs.createWriteStream(path);
    
    file.stream.pipe(outStream)
    outStream.on('error', cb);
    outStream.on('finish', function () {
        console.log(onedrive_filename)

        processToken(req, (err, response)=>{
          if (err) return cb(err);
          oneDriveAPI.items.uploadSimple({
            accessToken: response.accessToken,
            filename: onedrive_filename,
            readableStream: fs.createReadStream(path)
          }).then((item) => {
            fs.unlinkSync(path);
            cb(null, item);
          }).catch((err)=>{
            cb(err);
            console.log("Error:"+err);
          });
        });
    });

    
}

CustomStorage.prototype._removeFile = function _removeFile (req, file, cb) {
  var path = file.path

  delete file.destination
  delete file.filename
  delete file.path

  fs.unlink(path, cb)
}

exports.CustomStorage = function (opts) {
  return new CustomStorage(opts)
}