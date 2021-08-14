const jwt = require('jsonwebtoken');

const jwtAuth = (secret, authState) => (req, res, next) => {
  const token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

  if (!token) {
    res
      .status(200)
      .json({
        error: 'Unauthorized: No token provided',
        redirect: '/login'
      });
  } else {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        res
          .status(200)
          .json({
            error: 'Unauthorized: Invalid token',
            redirect: '/login'
          });
      } else {
        if (!authState.username) {
          res
            .status(200)
            .json({
              error: 'Unauthorized: Token not found or expired',
              redirect: '/login'
            });
        } else {
          req.username = decoded.username;
          next();
        }
      }
    })
  }
}

module.exports = {
  jwtAuth
}