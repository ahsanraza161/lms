// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD0RF75ccrSmSYQ0CojTVbdoQWLvrc2RHg',
  authDomain: 'lms-kit.firebaseapp.com',
  projectId: 'lms-kit',
  storageBucket: 'lms-kit.appspot.com',
  messagingSenderId: '405338162607',
  appId: '1:405338162607:web:24edc019c3757ba2bd9b5a',
  measurementId: 'G-5CK73SZ2YB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app, 'gs://lms-kit.appspot.com');

const analytics = getAnalytics(app);

export async function uploadMaterial(file) {
  try {
    const materialRef = ref(storage, file.name);
    const snapshot = await uploadBytes(materialRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(downloadURL)
    return downloadURL;
  } catch (err) {
    console.log(err);
  }
}

