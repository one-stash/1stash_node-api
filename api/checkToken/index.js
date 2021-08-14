module.exports = (app, jwtAuth) => {
  app.get('/api/checkToken', jwtAuth, (req, res) => {
    res.status(200).json({status: true});
  });
}