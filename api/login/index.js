const jwt = require('jsonwebtoken');
const path = require('path');
const adminModel = require('@db/models/admin');
const userModel = require('@db/models/user');


module.exports = (app, secret, authState) => {
  app.post('/api/login', (req, res) => {
    if (authState.username) {
      res
        .status(401)
        .json({
          error: 'This is single user application. User is already logged in'
        });
    } else {
      const {email, password} = req.body;
      userModel.findOne(
        {'email': email},
        (err, userResult)=>{
          if (err) res.status(502).json(err);
          if (userResult){
            if (userResult.comparePassword(password, userResult)){
              const token = jwt.sign({username}, secret, {expiresIn: '24h'});
              authState.username = username;
              res
                .status(200)
                .json({'token': token})
                .end()
            }else{
              res
                .status(401)
                .json({
                  error: 'Incorrect password'
                });
            }
          }else{
            adminModel.findOne(
              {email: email},
              (err, adminResult)=>{
                if (err) res.status(502).json(err);

                if (adminResult){
                  if (adminResult.comparePassword(password, adminResult.password)){
                    const token = jwt.sign({email}, secret, {expiresIn: '24h'});
                    authState.username = email;
                    res
                      .status(200)
                      .json({'token': token})
                      .end()
                  }else{
                    res
                      .status(401)
                      .json({
                        error: 'Incorrect password'
                      });
                  }
                }else{
                    res
                      .status(401)
                      .json({
                        error: 'Incorrect username'
                      });
                }
              }
            );
            
          }
        }
      )
    }
  });
}