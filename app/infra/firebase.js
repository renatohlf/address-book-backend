import firebase, { initializeApp } from 'firebase';

const config = {
    apiKey: "AIzaSyDsikDb6zhMUAP5eC6UYYRKkFvLL-BjRiI",
    authDomain: "addressbook-3a4e5.firebaseapp.com",
    databaseURL: "https://addressbook-3a4e5.firebaseio.com",
    projectId: "addressbook-3a4e5",
    storageBucket: "addressbook-3a4e5.appspot.com",
    messagingSenderId: "120328092777"
};

initializeApp(config);

export default firebase;