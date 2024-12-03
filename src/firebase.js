// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';  // Asegúrate de importar getAuth
import { getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOYeTpkGAAYcriSy65M-Yb9RFo2YX1xdc",
  authDomain: "recetaspwa.firebaseapp.com",
  projectId: "recetaspwa",
  storageBucket: "recetaspwa.firebasestorage.app",
  messagingSenderId: "58029335339",
  appId: "1:58029335339:web:022200f9d5e5e00c5ddb6e",
  measurementId: "G-XWW6DY0646"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Obtén la instancia de Firestore

// Configuración de Firestore con caché
const db = initializeFirestore(app, {
  localCache: {
    sizeBytes: CACHE_SIZE_UNLIMITED, // Configura un tamaño ilimitado para la caché
  },
});

// Exporta la instancia de Firestore
export { auth, db };