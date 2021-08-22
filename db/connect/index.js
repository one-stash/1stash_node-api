const mongoose = require('mongoose');
const {DBNAME, DBHOST} = require('../config');


module.exports = ()=>{
    try{
        mongoose.connect(DBHOST, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        mongoose.connection.once('open', (err)=>{
            if (err) throw err;

            console.log(`Connect to ${DBNAME} database sucecessfully`);
        });
    }catch(e){
        console.log("Unable to connect to database");
    }

}