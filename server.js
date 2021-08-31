require('module-alias/register');
const cors = require('cors');
const fs = require('fs');

const mongodb = require('mongodb');
const express = require('express');
const app = express();
const server = require('http').createServer(app);

const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// var refreshToken = "";

app.get('/', (req, res)=>{
  res.json('we rule the world');
})

require('./api/authorize')(app);
require('./api/adduser')(app);
require('./api/upload')(app);
require('./api/files')(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, function(){
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`);
});
