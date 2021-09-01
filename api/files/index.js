const onedriveApi = require('onedrive-api');
var processToken = require('@lib/onedrive').process;

module.exports = (app)=>{
    app.post('/api/files', (req, res)=>{
        processToken(req, (err, response)=>{
            if (err) res.status(500).json(err);
            onedriveApi.items.listChildren({
                accessToken: response.accessToken,
            }).then(async (childrens) => {
                var files = [],
                    folders = [];
                await Promise.all(childrens.value.map(async (child)=>{
                    if (child.file != null || child.file != undefined){
                        files.push({
                            file_name: child.name,
                            id: child.id,
                            size: child.size,
                            type: child.file.mimeType,
                            downloadUrl: child['@microsoft.graph.downloadUrl'],
                            viewUrl: child.webUrl,
                            createdDateTime: "2021-09-01T11:13:28.8Z",
                            lastModifiedDateTime: "2021-09-01T11:13:28.8Z"
                        });
                        console.log(child.name);
                    }
                    
                    else{
                        folders.push({
                            folder_name: child.name,
                            id: child.id,
                            size: child.size,
                            downloadUrl: child['@microsoft.graph.downloadUrl'],
                            viewUrl: child.webUrl,
                            createdDateTime: "2021-09-01T11:13:28.8Z",
                            lastModifiedDateTime: "2021-09-01T11:13:28.8Z"
                        });
                    }
                    
                }));
                console.log(childrens)
                res.status(200).json({number: childrens["@odata.count"], records: files});
            }).catch((err)=>{
                res.status(403).json(`Error: ${err}`);
            });
        });
    });
}