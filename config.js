// firebase config key steup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBj_z2ObSheA21laSg7ZaVtT476jcabWmA",
    authDomain: "hawcx-7b708.firebaseapp.com",
    projectId: "hawcx-7b708",
    storageBucket: "hawcx-7b708.appspot.com",
    messagingSenderId: "347891900881",
    appId: "1:347891900881:web:58670e646ed85a0f9540f0",
    measurementId: "G-SMKTCCNMLF"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  

  export { firebase };