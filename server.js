require('module-alias/register');

const fs = require('fs');
// const key = fs.readFileSync('./keys/privkey.pem');
// const cert = fs.readFileSync('./keys/cert.pem');
// const ca = fs.readFileSync('./keys/chain.pem');
const express = require('express');
const app = express();
const server = require('https').createServer(/* {key, cert, ca},  */app);
const cookieParser = require('cookie-parser');
const cors = require('cors');

const {
  WHITE_LISTED_DOMAINS,
  JWT_SECRET,
  UNPROTECTED_PATHS,
  PROTECTED_PATHS
} = require('./auth/config');

const {jwtAuth} = require('./auth/middleware');

const oneDriveMagic = require('@lib/onedrive');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();

const authState = {
  username: null
}

const PORT = 5000;

server.listen(PORT, function(){
  console.log(`Server running on port ${PORT}`);
});

const corsOptions = {
  credentials: true,
  origin: (origin, cb) => {
    if (WHITE_LISTED_DOMAINS.indexOf(origin) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error('I am sorry! Not allowed by CORS'));
    }
  }
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  UNPROTECTED_PATHS.concat(PROTECTED_PATHS),
  express.static(__dirname + '/ui/dist')
);
app.get(PROTECTED_PATHS, jwtAuth(JWT_SECRET, authState), (req, res) => {
  res.sendFile(__dirname + '/ui/dist/index.html');
});

app.get(UNPROTECTED_PATHS, (req, res) => {
  res.sendFile(__dirname + '/ui/dist/index.html');
});

require('./api/checkToken')(app, jwtAuth(JWT_SECRET, authState));
require('./api/login')(app, JWT_SECRET, authState);
require('./api/logout')(app, authState);

require('./api/builds')(app, jwtAuth(JWT_SECRET, authState));
require('./api/connectToImac')(app, jwtAuth(JWT_SECRET, authState), ssh);
require('./api/disconnectFromImac')(app, jwtAuth(JWT_SECRET, authState), ssh);
require('./api/upload')(app, jwtAuth(JWT_SECRET, authState), ssh);