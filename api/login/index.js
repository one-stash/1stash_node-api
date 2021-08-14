const jwt = require('jsonwebtoken');
const path = require('path');
const {pathToCredentials} = require('@secrets/fs/paths');



module.exports = (app, secret, authState) => {
  app.post('/api/login', (req, res) => {
    if (authState.username) {
      res
        .status(401)
        .json({
          error: 'This is single user application. User is already logged in'
        })
    } else {
      const {username, password} = req.body;
      const credentials = require(path.join(process.cwd(), pathToCredentials));
      if (credentials.username !== username || credentials.password !== password) {
        res
          .status(401)
          .json({
            error: 'Incorrect username or password'
          })
      } else {
        const token = jwt.sign({username}, secret, {expiresIn: '24h'});
        authState.username = username;
        res
          .status(200)
          .cookie('token', token, {httpOnly: true})
          .end()
      }
    }
  })
}