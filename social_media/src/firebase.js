import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyB3NMwNAOJHL7XdLPToqNV5vgb87bdKuno",
  authDomain: "social-media-2b46c.firebaseapp.com",
  projectId: "social-media-2b46c",
  storageBucket: "social-media-2b46c.appspot.com",
  messagingSenderId: "339961018946",
  appId: "1:339961018946:web:de64645edafb344e044bdb"
};
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export {db , auth, storage};

