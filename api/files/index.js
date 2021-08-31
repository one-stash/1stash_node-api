const onedriveApi = require('onedrive-api');
var processToken = require('@lib/onedrive').process;

module.exports = (app)=>{
    app.post('/api/files', (req, res)=>{
        processToken(req, (response)=>{
            onedriveApi.items.listChildren({
                accessToken: response.accessToken,
            }).then((childrens) => {
                res.status(200).json(childrens);
            }).catch((err)=>{
                res.status(403).json(`Error: ${err}`);
            });
        });
    });
}