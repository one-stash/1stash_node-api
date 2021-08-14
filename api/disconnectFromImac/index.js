module.exports = (app, jwtAuth, ssh) => {
  app.get('/api/disconnectFromImac', jwtAuth, (req, res) => {
    try {
      ssh.dispose();
      res.status(200).json({});
    }
    catch(error) {
      console.log(error);
      res.status(200).json({error: 'Could not close connection'});
    }
  })
}