import firebase from "firebase";
var config = {
  apiKey: "AIzaSyBI_CWl0SkrL-M2gFbmh-2fr-KnMBG5bhQ",
  authDomain: "projeto-tcc-5f567.firebaseapp.com",
  databaseURL: "https://projeto-tcc-5f567.firebaseio.com",
  projectId: "projeto-tcc-5f567",
  storageBucket: "projeto-tcc-5f567.appspot.com",
  messagingSenderId: "774308625479"
};
firebase.initializeApp(config);

const auth = firebase.auth();
const fs = firebase.firestore();

export { auth, fs };
