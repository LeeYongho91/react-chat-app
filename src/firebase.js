// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, update, push, child, onValue, onChildAdded, off } from "firebase/database";
import { getStorage, ref as stroageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBioCXY3vuCb8FvPH-72o-5LnMCYvH3woI",
  authDomain: "react-firebase-chat-app-2cb75.firebaseapp.com",
  projectId: "react-firebase-chat-app-2cb75",
  storageBucket: "react-firebase-chat-app-2cb75.appspot.com",
  messagingSenderId: "901984957351",
  appId: "1:901984957351:web:f36d6e745106891da8bc82",
  measurementId: "G-2880N81ZDD"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export {getAuth, 
        createUserWithEmailAndPassword, 
        updateProfile, 
        getDatabase, 
        ref, 
        set, 
        signInWithEmailAndPassword, 
        onAuthStateChanged, 
        signOut,
        getStorage,
        stroageRef,
        uploadBytes,
        getDownloadURL,
        update,
        push,
        child,
        onValue,
        onChildAdded,
        off,
        uploadBytesResumable
        };
