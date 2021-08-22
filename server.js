require('module-alias/register');

const fs = require('fs');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const {jwtAuth} = require('./auth/middleware');
const cookieParser = require('cookie-parser');

const {
  JWT_SECRET,
} = require('./auth/config');

require('@db/connect')();

const authState = {
  username: null
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

require('./api/checkToken')(app, jwtAuth(JWT_SECRET, authState));
require('./api/signup')(app, authState);
require('./api/login')(app, JWT_SECRET, authState);
require('./api/logout')(app, authState);

require('./api/files')(app, jwtAuth(JWT_SECRET, authState));
require('./api/builds')(app, jwtAuth(JWT_SECRET, authState));
require('./api/upload')(app, jwtAuth(JWT_SECRET, authState));
require('./api/files')(app, jwtAuth(JWT_SECRET, authState));

const PORT = process.env.PORT || 8080;

server.listen(PORT, function(){
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`);
});