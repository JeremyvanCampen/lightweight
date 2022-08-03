import { initializeApp } from 'firebase/app';
const {
  initializeAppCheck,
  ReCaptchaV3Provider,
} = require('firebase/app-check');
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
  enableMultiTabIndexedDbPersistence,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

//#region Firebase Config and initialization

//Firebase config
// const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_CONFIG_APIKEY,
//   authDomain: process.env.VUE_APP_FIREBASE_CONFIG_AUTHDOMAIN,
//   projectId: process.env.VUE_APP_FIREBASE_CONFIG_PROJECTID,
//   storageBucket: process.env.VUE_APP_FIREBASE_CONFIG_STORAGEBUCKET,
//   messagingSenderId: process.env.VUE_APP_FIREBASE_CONFIG_MESSAGINGSENDERID,
//   appId: process.env.VUE_APP_FIREBASE_CONFIG_APPID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCi--PS5Ze03_7UhD3Q5AvBjcuY8jTFJrU",
  authDomain: "lightweight-815c4.firebaseapp.com",
  projectId: "lightweight-815c4",
  storageBucket: "lightweight-815c4.appspot.com",
  messagingSenderId: "1097312546766",
  appId: "1:1097312546766:web:08d944c6d30914efd1459f"
};

//Initalizing Firebase and all modules
const app = initializeApp(firebaseConfig);

// Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
// key is the counterpart to the secret key you set in the Firebase console.

//To enable debug token uncomment next line
// self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(
//     process.env.VUE_APP_FIREBASE_CONFIG_RECAPTCHA_SITEKEY
//   ),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });

export const functions = getFunctions(app, 'europe-west3');
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

const auth = getAuth();
export const storage = getStorage();

enableMultiTabIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    //showToaster('Er staan meerdere tabbladen van linisol open. Hierdoor kunnen wij niet de offline functionaliteit aanzetten. Sluit alle niet gebruikte tabbladen en ververs deze pagina.', 'error', false);
    // The app is already open in another browser tab and multi-tab is not enabled.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

//#endregion

//#region Authentication

//Current user
export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

//#endregion