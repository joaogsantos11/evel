// Configuração compartilhada do Firebase do EVEL.
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB39l3pFhkpItMJkG90uh5ZhE-fs2JomZU",
    authDomain: "evel-14960.firebaseapp.com",
    projectId: "evel-14960",
    storageBucket: "evel-14960.firebasestorage.app",
    messagingSenderId: "596964040271",
    appId: "1:596964040271:web:ee4d70cbb28d648072d43a",
    measurementId: "G-VKENYR2DYD"
};

// Evita inicializar duas vezes caso outro módulo já tenha criado o app padrão.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
