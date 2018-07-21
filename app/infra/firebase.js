var firebase = require('firebase').initializeApp({
    serviceAccount: "./addressbook-03d0ab92095f.json",
    databaseURL: "https://addressbook-3a4e5.firebaseio.com/"
});

module.exports = firebase;