const dns = require('dns');

const resolveHostnameToIp = hostname => {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    })
  })
}

module.exports = (app, jwtAuth, ssh) => {
  app.post('/api/connectToImac', jwtAuth, async (req, res) => {
    try {
      const {host, username, password} = req.body;
      const ip = await resolveHostnameToIp(host);
      await ssh.connect({host: ip, username, password});
      res.status(200).json({});
    }
    catch(error) {
      console.log(error);
      res.status(200).json({error: 'Could not connect'});
    }
  })
}