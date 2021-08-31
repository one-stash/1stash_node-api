const authInitializer = require('@lib/onedrive');
const auth = require('../../secrets/onedrive/auth');

module.exports = (app)=>{
    authInitializer.init(app);
}