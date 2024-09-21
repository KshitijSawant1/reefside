// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCM2mAhRVPQNlSyNwdh-z8asUK7aq1x6lY",
  authDomain: "reefside-19313.firebaseapp.com",
  projectId: "reefside-19313",
  storageBucket: "reefside-19313.appspot.com",
  messagingSenderId: "773837230178",
  appId: "1:773837230178:web:56df16e5d893c44476013b",
  measurementId: "G-T2Z74L6ZF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const db = getFirestore(app);