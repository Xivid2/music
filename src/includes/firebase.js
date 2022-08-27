import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtwKSRVBbd-7L0lGG4f-KQC5rN6xfdXLc",
  authDomain: "music-9ca4d.firebaseapp.com",
  projectId: "music-9ca4d",
  storageBucket: "music-9ca4d.appspot.com",
  appId: "1:978716519058:web:a32000a9bd7283937d544b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Firebase
export default app;