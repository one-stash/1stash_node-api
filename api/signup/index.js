const adminModel = require('@db/models/admin');
const userModel = require('@db/models/user');

module.exports = (app, authState)=>{
    app.post('/api/admin/signup', (req, res)=>{
        var {name, email, password} = req.body;
        var admin = adminModel({
            'name': name,
            'email': email,
            'password':password
        });

        admin.save()
        .then((result)=>{
            res.status(200)
            .json(`Admin account ${result.name} registration successful`)
        })
        .catch((err)=>{
            res.status(401)
            .json(err);
        });
        
    });

    app.post('/api/signup', (req, res)=>{
        var {name, email, password} = req.body;
        var user = userModel({
            'name': name,
            'email': email,
            'password':password
        });

        user.save()
        .then((result)=>{
            res.status(200)
            .json(`User account ${result.name} registration successful`)
        })
        .catch((err)=>{
            res.status(401)
            .json(err);
        });
        
    });
}