import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_CONFIG_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
