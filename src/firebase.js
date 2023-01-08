// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHVWC8bb4mvpjNf_eLDjku45aqlp5RUiI",
    authDomain: "clone-e804c.firebaseapp.com",
    projectId: "clone-e804c",
    storageBucket: "clone-e804c.appspot.com",
    messagingSenderId: "1041950521267",
    appId: "1:1041950521267:web:18c883f66c8ed730bffdc6",
    measurementId: "G-XCTQX5MGGY"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  export { db, auth };