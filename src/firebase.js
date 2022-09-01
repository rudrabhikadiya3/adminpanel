
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDxJ-7hu_3BVjDBbfDFra5SWgxUh7gWTo",
  authDomain: "city-hospital-adminpanel.firebaseapp.com",
  projectId: "city-hospital-adminpanel",
  storageBucket: "city-hospital-adminpanel.appspot.com",
  messagingSenderId: "1001380086707",
  appId: "1:1001380086707:web:a3a9616c809d29cecc01c6",
  measurementId: "G-DY4MP6T7JM"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
