module.exports = (app, authState) => {
  app.get('/api/logout', (req, res) => {
    authState.username = null;
    res
      .status(200)
      .cookie('token', '', {httpOnly: true})
      .end()
  })
}