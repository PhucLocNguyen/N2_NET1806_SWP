// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUajbxNsuE5eTjvSFOz-HsJK5xLu03yJM",
  authDomain: "fir-e797a.firebaseapp.com",
  projectId: "fir-e797a",
  storageBucket: "fir-e797a.appspot.com",
  messagingSenderId: "41242323115",
  appId: "1:41242323115:web:77d730fd72e0eb1f306fee",
  measurementId: "G-8HFQ1SZ353"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);