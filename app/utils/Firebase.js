import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCuU2-Sai0lzId1VvRyUzqIVEFRrzx_f8g",
  authDomain: "ecodeas-5142d.firebaseapp.com",
  databaseURL: "https://ecodeas-5142d.firebaseio.com",
  projectId: "ecodeas-5142d",
  storageBucket: "ecodeas-5142d.appspot.com",
  messagingSenderId: "479170582492",
  appId: "1:479170582492:web:dab3d8d47a411ccf68a119",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
