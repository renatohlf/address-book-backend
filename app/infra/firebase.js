var firebase = require('firebase').initializeApp({
    serviceAccount: "./addressbook-f2bf13cb7051.json",
    databaseURL: "https://addressbook-3a4e5.firebaseio.com/"
});

module.exports = firebase;