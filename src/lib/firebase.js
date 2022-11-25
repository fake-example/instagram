import Firebase from "firebase/compat/app";
import firebaseAuthServices from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyBkden2ho8BH-tbiDf_Cniu3XLx9zd_vKw",
  authDomain: "insta-yasirovv.firebaseapp.com",
  projectId: "insta-yasirovv",
  storageBucket: "insta-yasirovv.appspot.com",
  messagingSenderId: "126558661701",
  appId: "1:126558661701:web:8b1558738fa19d0ba2472c"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
