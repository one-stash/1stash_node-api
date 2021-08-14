const msal = require('@azure/msal-node');
const {Client} = require('@microsoft/microsoft-graph-client');
const auth = require('@secrets/onedrive/auth');
const userId = require('@secrets/onedrive/userId');
global.fetch = require('node-fetch');

module.exports = async () => {
  try {
    const cca = new msal.ConfidentialClientApplication({auth});

    const clientCredentialRequest = {
      scopes: ['https://graph.microsoft.com/.default']
    };
  
    const response = await cca.acquireTokenByClientCredential(clientCredentialRequest);
    console.log('Response: ', response);

    const client = Client.init({
      defaultVersion: 'v1.0',
      debugLogging: true,
      authProvider: done => {
        done(null, response.accessToken);
      }
    })

    console.log('client: ', client);

    const drive = await client.api(`/users/${userId}/drive`).get();
    console.log('drive: ', drive);
  }
  catch(error) {
    console.log(error);
  }
}