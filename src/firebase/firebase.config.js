// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: process.env.REACT_APP_apiKey,
    // authDomain: process.env.REACT_APP_authDomain,
    // projectId: process.env.REACT_APP_projectId,
    // storageBucket: process.env.REACT_APP_storageBucket,
    // messagingSenderId: process.env.REACT_APP_messagingSenderId,
    // appId: process.env.REACT_APP_appId
    apiKey: "AIzaSyA2uLc789zj0_EcOeJAudz7XVjfd3QgxwM",

    authDomain: "job-box-acc.firebaseapp.com",

    projectId: "job-box-acc",

    storageBucket: "job-box-acc.appspot.com",

    messagingSenderId: "1049243998355",

    appId: "1:1049243998355:web:ce99703566d7bc71461566"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;