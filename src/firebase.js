import firebase from "firebase/compat/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth";
// import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC3_WO_Sc4J1zRnTSRjb7nSwgL8OAPiZY",
  authDomain: "helloworldauthentication-1012b.firebaseapp.com",
  projectId: "helloworldauthentication-1012b",
  storageBucket: "helloworldauthentication-1012b.appspot.com",
  messagingSenderId: "343339035712",
  appId: "1:343339035712:web:bd1871ee49c41dad7d03a5",
};
console.log(firebase);
const app = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
// export const googleAuthProvider =null;
// export const firestore = firebase.firestore();
