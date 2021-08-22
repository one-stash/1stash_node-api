const { jwtAuth } = require("../../auth/middleware");
const upload = require('@lib/storage');

module.exports = async(app, jwtAuth)=>{
    app.post('/api/upload', jwtAuth, upload.single('file'), (req, res)=>{
        res.json("sent successfully");
    });
}