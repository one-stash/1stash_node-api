const {Schema, model} = require('mongoose');
const {genSalt, hash, compareSync} = require('bcryptjs');

var adminSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true,
        unique: true
    },
    'password': {
        type: String,
        required: true
    }
});

adminSchema.pre('save',function(next){
    var user = this;
    genSalt(10, (err, salt)=>{
        if (err) console.error(err);
        hash(user.password, salt, (err, hash)=>{
            if (err) console.error(err);
            this.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = (password, hashPassword)=>{
    return compareSync(password, hashPassword);
}
    
module.exports = model('admin', adminSchema);
