const msal = require('@azure/msal-node');
const auth = require('@secrets/onedrive/auth');
const onedriveApi = require('onedrive-api');

module.exports = (app, jwtAuth)=>{
    app.post('/api/files', jwtAuth, async (req, res)=>{
        try {
            const cca = new msal.ConfidentialClientApplication({auth});
        
            const clientCredentialRequest = {
                scopes: ['https://graph.microsoft.com/.default']
            };
            
            const {accessToken} = await cca.acquireTokenByClientCredential(clientCredentialRequest);

            console.log(accessToken);
            onedriveApi.items.listChildren({
                accessToken: accessToken,
            }).then((childrens) => {
                res.status(200).json(childrens);
            });
        }
        catch(error) {
            res.status(401).json(`Error : ${error}`);
        }
        
    });
}