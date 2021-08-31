const upload = require('@lib/storage');

module.exports = async(app)=>{
    app.post('/api/upload', upload.single('file'), (req, res)=>{
        console.log(req.body.filename);
        res.json(`Sent ${req.file.originalname} successfully`);
    });
}