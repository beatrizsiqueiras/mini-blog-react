import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBjkgaDOUU7ZnLc9XbiRrhgli_eZrb73e0",
    authDomain: "miniblog-f1d20.firebaseapp.com",
    projectId: "miniblog-f1d20",
    storageBucket: "miniblog-f1d20.appspot.com",
    messagingSenderId: "219967529993",
    appId: "1:219967529993:web:56879bd216f9aef6b704d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getFirestore(app);

export { database };
