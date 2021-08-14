const {sharedFolder} = require('@secrets/ssh/paths');
const {pathToBuilds} = require('@secrets/fs/paths');

module.exports = (app, jwtAuth, ssh) => {
  app.post('/api/upload', jwtAuth, async (req, res) => {
    try {
      // send response
      res.status(200).json({});

      const {build} = req.body;
      let result;

      // remove temp folder if exists
      result = await ssh.execCommand(
        'if [ -d upload_temp ]; then rm -Rf upload_temp; fi',
        {cwd: sharedFolder}
      );
      console.log(result);

      // create temp folder
      result = await ssh.execCommand(
        'mkdir upload_temp',
        {cwd: sharedFolder}
      );
      console.log(result);

      // copy imac.zip
      result = await ssh.putFile(
        `${pathToBuilds}/${build}/imac.zip`,
        `${sharedFolder}/upload_temp/imac.zip`
      );
      console.log(result);

      // remove imac folder and create again
      result = await ssh.execCommand(
        'if [ -d imac ]; then rm -Rf imac; fi; mkdir imac',
        {cwd: sharedFolder}
      );
      console.log(result);

      // unzip
      result = await ssh.execCommand(
        `unzip imac.zip -d ${sharedFolder}/imac`,
        {cwd: `${sharedFolder}/upload_temp`}
      )
      console.log(result);

      // make admin executable
      result = await ssh.execCommand(
        `sudo chmod +x admin`,
        {cwd: `${sharedFolder}/imac/bin`}
      )
      console.log(result);

      // make imac executable
      result = await ssh.execCommand(
        `sudo chmod +x imac`,
        {cwd: `${sharedFolder}/imac/bin`}
      )
      console.log(result);

      // ls
      result = await ssh.execCommand(
        'ls',
        {cwd: `${sharedFolder}/imac`}
      );
      console.log(result);

      // remove temp folder
      result = await ssh.execCommand(
        'rm -rf upload_temp',
        {cwd: sharedFolder}
      );
      console.log(result);
      
    } 
    catch(error) {
      console.log(error);
      res.status(200).json({error: 'could not upload'})
    }
  })
}