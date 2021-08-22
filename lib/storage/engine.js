const fs = require('fs')
const os = require('os')
const crypto = require('crypto')
const mkdirp = require('mkdirp');
const {pathToBuilds} = require('@secrets/fs/paths');
const {accessToken} = require('@lib/onedrive');
const onedriveApi = require('onedrive-api');

function getFilename (req, file, cb) {
  crypto.pseudoRandomBytes(16, function (err, raw) {
    cb(err, err ? undefined : raw.toString('hex'))
  });
}

function getDestination (req, file, cb) {
  cb(null, os.tmpdir())
}

function CustomStorage (opts) {}


CustomStorage.prototype._handleFile = async function _handleFile (req, file, cb) {
    var that = this
        
    try {
    const cca = new msal.ConfidentialClientApplication({auth});

    const clientCredentialRequest = {
        scopes: ['https://graph.microsoft.com/.default']
    };

    const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);
    onedriveApi.items.uploadSession(
        {
            accessToken: accessToken,
            filename: req.name || "file",
            readableStream: file
        },
        (bytesUploaded)=>{
            console.log(bytesUploaded);
        }
    ).then((item)=>{
        cb(item);
    });
    }
    catch(error) {
    console.log('Error: ',error);
    cb();
    }
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