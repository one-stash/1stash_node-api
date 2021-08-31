const upload = require('@lib/storage');

module.exports = async(app)=>{
    app.post('/api/upload', upload.single('file_folder'), (req, res)=>{
        console.log(req.body.filename);
        res.json(`Sent ${req.file.originalname} successfully`);
    });
}