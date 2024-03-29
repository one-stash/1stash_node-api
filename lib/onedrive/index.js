const msal = require('@azure/msal-node');
const auth = require('@secrets/onedrive/auth');
const fs = require('fs');
const REDIRECT_URI = process.env.NODE_ENV === 'production'? 'https://onestashapi.herokuapp.com/redirect': 'http://localhost:5000/redirect';
const scopes = ["user.read", "files.readwrite", "offline_access", "files.readwrite.all"];
const DBHandler = require('@db/onedrive/handler');


function transFormSilent(data){
    var newData = {
        "Account": data.account,
        "AccessToken": data.accessToken,
        "RefreshToken":{},
        "IdToken": idToken,
        "AppMetadata":{}
    }
}

const config = {
    auth: auth,
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
};

const cca = new msal.ConfidentialClientApplication(config);

exports.process =  async (req, callback)=>{
    DBHandler.get((err, data)=>{
        if (err) callback(err, null);
        callback(null, data);
    })
}

exports.init = async (app)=>{
    app.get('/api/authorize', (req, res) => {
        res.cookie('onFinishUrl', '')
        const authCodeUrlParameters = {
            scopes: scopes,
            redirectUri: REDIRECT_URI,
        };

        // get url to sign user in and consent to scopes needed for application
        cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
            res.redirect(response);
        }).catch((error) => console.log(JSON.stringify(error)));
    });

    app.get('/redirect', (req, res) => {
        const tokenRequest = {
            code: req.query.code,
            redirectUri: REDIRECT_URI,
            scopes: scopes,
        };
    
        cca.acquireTokenByCode(tokenRequest).then((response) => {
            console.log("\nResponse: \n:", response);
            DBHandler.save(response);
            res.redirect('https://1stash.netlify.app/#/dashboard/admin/home');
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        });
    });
}




// const msal = require('@azure/msal-node');
// const auth = require('@secrets/onedrive/auth');
// const fs = require('fs');
// const REDIRECT_URI = process.env.NODE_ENV === 'production'? 'https://onestashapi.herokuapp.com/redirect': 'http://localhost:5000/redirect';
// const scopes = ["user.read", "files.readwrite", "offline_access", "files.readwrite.all"];
// const DBHandler = require('@db/onedrive/handler');


// function transFormSilent(data){
//     var newData = {
//         "Account": data.account,
//         "AccessToken": data.accessToken,
//         "RefreshToken":{},
//         "IdToken": idToken,
//         "AppMetadata":{}
//     }
// }

// const config = {
//     auth: auth,
//     system: {
//         loggerOptions: {
//             loggerCallback(loglevel, message, containsPii) {
//                 console.log(message);
//             },
//             piiLoggingEnabled: false,
//             logLevel: msal.LogLevel.Verbose,
//         }
//     }
// };

// const cca = new msal.ConfidentialClientApplication(config);
// const msalCache = cca.getTokenCache();

// exports.process =  async (req, callback)=>{
//     DBHandler.get((err, data)=>{
//         if (err) callback(err, null);
//         msalCache.deserialize(JSON.stringify(data).substring(2));
//         account = msalCache.serialize();
//         console.log(account);
//         const slientToken = {
//             account: data,
//             scopes: scopes
//         }

//         cca.acquireTokenSilent(slientToken).then((result)=>{
//             callback(null, result)
//         }).catch((err)=>{
//             callback(err, null);
//         })
        
//     })
// }


// exports.authUser = async (app)=>{
//     app.get('/api/authenticateuser', (req, res) => {
//         const authCodeUrlParameters = {
//             scopes: scopes,
//             redirectUri: REDIRECT_URI,
//         };
//         // get url to sign user in and consent to scopes needed for application
//         cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
//             res.redirect(response);
//         }).catch((error) => console.log(JSON.stringify(error)));
//     });

//     app.get('/redirectuser', (req, res) => {
//         const tokenRequest = {
//             code: req.query.code,
//             redirectUri: REDIRECT_URI,
//             scopes: scopes,
//         };
    
//         cca.acquireTokenByCode(tokenRequest).then((response) => {
//             console.log("\nResponse: \n:", response);
//             DBHandler.save(response.account.username, response);
//             res.redirect('https://1stash.netlify.app/#/onboard/sign-in')
//         }).catch((error) => {
//             console.log(error);
//             res.status(500).send(error);
//         });
//     });
// }


// exports.init = async (app)=>{
//     app.get('/api/authorize', (req, res) => {
//         const authCodeUrlParameters = {
//             scopes: scopes,
//             redirectUri: REDIRECT_URI,
//         };
//         // get url to sign user in and consent to scopes needed for application
//         cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {
//             res.redirect(response);
//         }).catch((error) => console.log(JSON.stringify(error)));
//     });

//     app.get('/redirect', (req, res) => {
//         const tokenRequest = {
//             code: req.query.code,
//             redirectUri: REDIRECT_URI,
//             scopes: scopes,
//         };
    
//         cca.acquireTokenByCode(tokenRequest).then((response) => {
//             console.log("\nResponse: \n:", response);
//             DBHandler.save(response.account.username, response);
//             res.redirect('https://1stash.netlify.app/#/dashboard/user/home')
//         }).catch((error) => {
//             console.log(error);
//             res.status(500).send(error);
//         });
//     });
// }