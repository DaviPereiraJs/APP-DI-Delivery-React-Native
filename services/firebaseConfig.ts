import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- SUAS CREDENCIAIS ---
// IMPORTANTE: Substitua pelos dados reais que estão no console do Firebase
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// --- INICIALIZAÇÃO PADRÃO ---

// Inicializa o app do Firebase
const app = initializeApp(firebaseConfig);

// Inicializa a Autenticação
const auth = getAuth(app);

// Inicializa o Banco de Dados
const db = getFirestore(app);

export { auth, db };