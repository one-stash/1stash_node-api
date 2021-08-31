const {createTransport}= require('nodemailer');
const auth = require('@secrets/mail/auth/index.js');



module.exports = (mailOptions, callback)=>{
    mailOptions.from = auth.user;

    try{
        const transporter = createTransport({
          service: 'gmail',
          auth: auth.gmail
        });

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              callback(error, null);
            } else {
              callback(null, info)
              console.log('Email sent: ' + info.response);
            }
        });
    }catch(err){
      callback(err, null)
    }
}
 