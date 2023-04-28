import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAa0ODuAAQSwXSYzvmHAzywiWSRKA8IK5k",
  authDomain: "spellingformygrandchildren.firebaseapp.com",
  databaseURL: "https://spellingformygrandchildren-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "spellingformygrandchildren",
  storageBucket: "spellingformygrandchildren.appspot.com",
  messagingSenderId: "94904036611",
  appId: "1:94904036611:web:f838325314ceff3e8e8d36",
  measurementId: "G-FY48D5ZYLS"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
