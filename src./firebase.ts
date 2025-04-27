// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID,
//   measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// export const auth = getAuth(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCh4MO5nS8o5dHX4UfUPAZ42-_eHTQhutA",
//   authDomain: "insiders-task-todo-list-main.firebaseapp.com",
//   projectId: "insiders-task-todo-list-main",
//   storageBucket: "insiders-task-todo-list-main.firebasestorage.app",
//   messagingSenderId: "796619389273",
//   appId: "1:796619389273:web:5bb795d9e261e975db7448",
//   measurementId: "G-V6LCSCL98Z",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh4MO5nS8o5dHX4UfUPAZ42-_eHTQhutA",
  authDomain: "insiders-task-todo-list-main.firebaseapp.com",
  projectId: "insiders-task-todo-list-main",
  storageBucket: "insiders-task-todo-list-main.firebasestorage.app",
  messagingSenderId: "796619389273",
  appId: "1:796619389273:web:5bb795d9e261e975db7448",
  measurementId: "G-V6LCSCL98Z",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
