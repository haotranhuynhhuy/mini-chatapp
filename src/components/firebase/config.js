import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig =({
    apiKey: "AIzaSyBnsSYkis2wdDw1RxHmdYZiLkcmNg_B4kc",
    authDomain: "chat-app-a2552.firebaseapp.com",
    projectId: "chat-app-a2552",
    storageBucket: "chat-app-a2552.appspot.com",
    messagingSenderId: "844268131279",
    appId: "1:844268131279:web:1a4abc9675edfa50db38ba"
});
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
// if (window.location.hostname === 'localhost') {
//     auth.useEmulator('http://localhost:9099');
//     db.useEmulator('localhost', '8080');
//   }
export {auth, db};
export default firebase;
