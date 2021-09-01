const authInitializer = require('@lib/onedrive');

module.exports = (app)=>{
    authInitializer.authUser(app);
}