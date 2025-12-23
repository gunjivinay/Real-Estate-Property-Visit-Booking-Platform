// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT-qvxZ306K4EC3QAWcTO2Ju1X80xFl9o",
    authDomain: "real-estate-booking-plat-af248.firebaseapp.com",
    projectId: "real-estate-booking-plat-af248",
    storageBucket: "real-estate-booking-plat-af248.firebasestorage.app",
    messagingSenderId: "647540407402",
    appId: "1:647540407402:web:ff853d4319539fd21f9e13",
    measurementId: "G-WL10SE9QCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, analytics, auth };
