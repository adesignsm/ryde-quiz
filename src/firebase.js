import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getStorage, ref as StorageRef } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBaxcA2IwfQ4bDrPq1LC85KUaBdbtiMrNU",
    authDomain: "ryde-quiz.firebaseapp.com",
    projectId: "ryde-quiz",
    storageBucket: "ryde-quiz.appspot.com",
    messagingSenderId: "918321246032",
    appId: "1:918321246032:web:5f65d1fcaec6eaecf78655",
    measurementId: "G-RDF4TVE4K5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const storage = getStorage(app);

export { db, push, ref, storage, StorageRef };