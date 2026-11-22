import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvUDfbqiVMcSn-gUdcC8390lLL8EMUPNI",
  authDomain: "foodflow-60cc0.firebaseapp.com",
  projectId: "foodflow-60cc0",
  storageBucket: "foodflow-60cc0.firebasestorage.app",
  messagingSenderId: "656423876368",
  appId: "1:656423876368:web:1846f41d00a436332e5795",
  measurementId: "G-JTQH1LQSJW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;



