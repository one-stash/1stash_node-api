const mongoClient = require('mongodb').MongoClient;
const {DBNAME, DBHOST} = require('../config');


module.exports = (callback)=>{
    try{
        mongoClient.connect(DBHOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        function(err, db) {
            if (err) throw err;
            callback(db);
        });
    }catch(e){
        console.log(e);
    }

}