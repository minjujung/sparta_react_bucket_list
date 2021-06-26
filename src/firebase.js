import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBZphos_2P-Hn_gbo_8Cr8kSjSPtyTbWjY",
    authDomain: "sparta-react-360a0.firebaseapp.com",
    projectId: "sparta-react-360a0",
    storageBucket: "sparta-react-360a0.appspot.com",
    messagingSenderId: "112796630981",
    appId: "1:112796630981:web:fbdfe282cd4d44a5c4d5ac",
    measurementId: "G-N17PRMV6N6"
}

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export {firestore}
