import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyDxR37c0J9OkLeZsZS99deCVRisFOmUpeY",

    authDomain: "s2smovies-faf3f.firebaseapp.com",

    projectId: "s2smovies-faf3f",

    storageBucket: "s2smovies-faf3f.appspot.com",

    messagingSenderId: "126128830808",

    appId: "1:126128830808:web:0fe6210fe3d0c7a280cd2d",

    measurementId: "G-JSJYXX8GD4"

  };



const app = initializeApp(firebaseConfig);
const db  = getFirestore(app)


export{db}