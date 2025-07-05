import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAbZyCXopbh5PEysVwXc39WUK7Ij9rc-mQ",
  authDomain: "cooking-figo.firebaseapp.com",
  projectId: "cooking-figo",
  storageBucket: "cooking-figo.firebasestorage.app",
  messagingSenderId: "670028491679",
  appId: "1:670028491679:web:e92e4780f3aaa94d5c6baa"
};

  // initialize Firebase

  firebase.initializeApp(firebaseConfig);


  // initialize services
  const projectFirestore = firebase.firestore();

  export { projectFirestore };