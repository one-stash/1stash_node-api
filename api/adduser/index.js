const fs = require('fs');
const mailer = require('@lib/mail/index.js')
const message  = fs.readFileSync('./lib/mail/template/index.html')

module.exports = (app)=>{
    console.log('we rule');
    app.post('/api/adduser', (req, res)=>{
        var email = req.body.email || null;
        if (!email){
            console.log("provide email parameter");
            res.status(401).json("provide email parameter");
        }else{
            var options = {
                to: email,
                subject: 'Complete Registration on Onestash',
                html: message
            };

            mailer(options, (err, result)=>{
                if (err) res.json("Error :"+err);
                res.json("sent to "+email+" successful");
            });
        }
        
        
    });
}