// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDu5fcdG0Q7iZOVfYbCYnj5RherIgGS3aw',
  authDomain: 'project-management-dc43a.firebaseapp.com',
  projectId: 'project-management-dc43a',
  storageBucket: 'project-management-dc43a.appspot.com',
  messagingSenderId: '1071032163501',
  appId: '1:1071032163501:web:456c2290a499d4c20a7a24',
  measurementId: 'G-QM56YG714M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
