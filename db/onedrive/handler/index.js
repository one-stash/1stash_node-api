DBConnect = require('../../connect');

exports.save = (token)=>{
    DBConnect((db)=>{
        var dbo = db.db("onestash");
        dbo.collection("tokens").deleteMany({}, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
            dbo.collection("tokens").insertOne({_id: 1, token: token}, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });
    });
}

exports.get = (callback)=>{
    DBConnect((db)=>{
        var dbo = db.db("onestash");
        dbo.collection("tokens").findOne({_id: 1}, function(err, result) {
            if (err) callback(err, null);
            // console.log(result.token)
            callback(null, result.token);
            db.close();
        });

    })
}