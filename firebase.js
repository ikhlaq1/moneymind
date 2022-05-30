// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set } from "firebase/database";

// Your web app's Firebase configuration
import { authDomain ,databaseURL,measurementId,appId,messagingSenderId,storageBucket,projectId, API_KEY} from '@env'

const firebaseConfig = {
    apiKey: "AIzaSyA42ewRRuGziFvaUeMsHPhsCbQRxe1oQ7M",
    authDomain: "module-6225f.firebaseapp.com",
    databaseURL: "https://module-6225f-default-rtdb.firebaseio.com",
    projectId: "module-6225f",
    storageBucket: "module-6225f.appspot.com",
    messagingSenderId: "400929924176",
    appId: "1:400929924176:web:d12e05f9b5d77e28ca5d55"
};
initializeApp(firebaseConfig);


// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app()
// }
export const  db = getDatabase();