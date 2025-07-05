import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "API KEY",
  authDomain: "cooking-figo.firebaseapp.com",
  projectId: "cooking-figo",
  storageBucket: "cooking-figo.firebasestorage.app",
  messagingSenderId: "670028491679",
  appId: "APP ID"
};

  // initialize Firebase

  firebase.initializeApp(firebaseConfig);


  // initialize services
  const projectFirestore = firebase.firestore();

  export { projectFirestore };
