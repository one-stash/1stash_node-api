const msal = require('@azure/msal-node');
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
    return response;
  }
  catch(error) {
    console.log('Error: ',error);
  }
}