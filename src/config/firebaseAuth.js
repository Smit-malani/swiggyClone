import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = JSON.parse(import.meta.env.VITE_KEY);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider =  new GoogleAuthProvider

export {auth,provider}