// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhp1kbirYFoisS8tS4DkF3n6-HbHQ0Q9k",
  authDomain: "n-back-fbbf3.firebaseapp.com",
  projectId: "n-back-fbbf3",
  storageBucket: "n-back-fbbf3.appspot.com",
  messagingSenderId: "563557433643",
  appId: "1:563557433643:web:4c8fd72e0f093842a6856e",
  measurementId: "G-MXJBBWV6XZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const analytics = getAnalytics(app);

export default db;