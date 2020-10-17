import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQ3NfD9HzTdpEVV7qMBMCGXNWKLaaF50k",
  authDomain: "instagram-clone-59a0c.firebaseapp.com",
  databaseURL: "https://instagram-clone-59a0c.firebaseio.com",
  projectId: "instagram-clone-59a0c",
  storageBucket: "instagram-clone-59a0c.appspot.com",
  messagingSenderId: "1044408531974",
  appId: "1:1044408531974:web:e63cc8d7a938df3c635787",
  measurementId: "G-JHSH2ZPMV4",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
