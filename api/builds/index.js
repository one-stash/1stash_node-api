const fsMagic = require('@lib/fs');
const {
  pathToBuilds
} = require('@secrets/fs/paths');

module.exports = (app, jwtAuth) => {
  app.get('/api/builds', jwtAuth, async (req, res) => {
    try {
      const [folders, files] = await fsMagic.readDir(pathToBuilds);
      res.status(200).json({builds: folders});
    }
    catch(error) {
      console.log(error);
      res.status(200).json({error: 'Could not get list of builds'});
    }
  })
}