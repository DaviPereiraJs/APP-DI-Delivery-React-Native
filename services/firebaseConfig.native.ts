import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// 1. Voltamos a importar do pacote principal
// @ts-ignore
import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyATRROwGWm7m4pJSCJO6ceuCitKb8MvQL8",
  authDomain: "di-delivery-bc5a7.firebaseapp.com",
  projectId: "di-delivery-bc5a7",
  storageBucket: "di-delivery-bc5a7.firebasestorage.app",
  messagingSenderId: "519978408977",
  appId: "1:519978408977:android:02d7a7a6daf0f022c5a5b0"
};

const app = initializeApp(firebaseConfig);

// 2. Configuramos o Auth forçando a persistência
// O @ts-ignore aqui evita o erro "implicitly has an 'any' type" ou "no exported member"
// @ts-ignore
const auth: Auth = initializeAuth(app, {
  // @ts-ignore
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };