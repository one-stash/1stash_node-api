const {Schema, model} = require('mongoose');
const {genSalt, hash, compare} = require('bcryptjs');

var userSchema = new Schema({
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

userSchema.pre('save',function(next){
    var user = this;

    genSalt(10, (err, salt)=>{
        if (err) next(err);
        hash(user.password, salt, (err, hash)=>{
            if (err) next(err);
            this.password = hash;
            next()
        });
    });
});

userSchema.methods.comparePassword = (password, hashPassword)=>{
    compare(password, hashPassword, (err, success)=>{
        if (err) console.error(err);
        return success;
    });
}
    
module.exports = model('user', userSchema);