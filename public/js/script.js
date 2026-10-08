import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ====================
// FIREBASE
// ====================
const firebaseConfig = {
  apiKey: "AIzaSyB39l3pFhkpItMJkG90uh5ZhE-fs2JomZU",
  authDomain: "evel-14960.firebaseapp.com",
  projectId: "evel-14960",
  storageBucket: "evel-14960.firebasestorage.app",
  messagingSenderId: "596964040271",
  appId: "1:596964040271:web:ee4d70cbb28d648072d43a",
  measurementId: "G-VKENYR2DYD"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function traduzirErro(code) {
    const erros = {
        "auth/email-already-in-use": "Este e-mail já está cadastrado.",
        "auth/invalid-email": "E-mail inválido.",
        "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/user-not-found": "Usuário não encontrado.",
        "auth/wrong-password": "Senha incorreta.",
        "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde."
    };
    return erros[code] || "Erro inesperado. Tente novamente.";
}

// ====================
// ELEMENTOS
// ====================

const modalLogin = document.getElementById("modalLogin");
const modalCadastro = document.getElementById("modalCadastro");

const abrirLoginTraduz = document.getElementById("abrirLoginTraduz");
const abrirLoginAprender = document.getElementById("abrirLoginAprender");

const fecharLogin = document.getElementById("fecharLogin");
const fecharCadastro = document.getElementById("fecharCadastro");

const abrirCadastro = document.getElementById("abrirCadastro");
const voltarLogin = document.getElementById("voltarLogin");

// ====================
// MOSTRAR LOGIN / CADASTRO
// ====================

function mostrarLogin() {
    if (!modalCadastro || !modalLogin) return;
    modalCadastro.style.display = "none";
    modalLogin.style.display = "flex";
}

function mostrarCadastro() {
    if (!modalLogin || !modalCadastro) return;
    modalLogin.style.display = "none";
    modalCadastro.style.display = "flex";
}

function ligarEvento(elemento, funcao) {
    if (!elemento) return;
    elemento.addEventListener("click", function (event) {
        event.preventDefault();
        funcao();
    });
}

ligarEvento(abrirLoginTraduz, mostrarLogin);
ligarEvento(abrirLoginAprender, mostrarLogin);
ligarEvento(abrirCadastro, mostrarCadastro);
ligarEvento(voltarLogin, mostrarLogin);

if (fecharLogin) {
    fecharLogin.addEventListener("click", function () {
        modalLogin.style.display = "none";
    });
}

if (fecharCadastro) {
    fecharCadastro.addEventListener("click", function () {
        modalCadastro.style.display = "none";
    });
}

// ====================
// CARREGAR CABEÇALHO
// (o botão de login do cabeçalho só existe depois que ele carrega)
// ====================

const areaCabecalho = document.getElementById("cabecalho");

if (areaCabecalho) {
    fetch("componentes/cabecalho.html")
        .then(resposta => resposta.text())
        .then(html => {
            areaCabecalho.innerHTML = html;

            const abrirLogin = document.getElementById("abrirLogin");
            ligarEvento(abrirLogin, mostrarLogin);
        })
        .catch(erro => console.log("Erro ao carregar cabeçalho:", erro));
}

// ====================
// CADASTRO (Firebase)
// ====================

async function cadastrar() {
    const nome = document.getElementById("cadNome").value.trim();
    const email = document.getElementById("cadEmail").value.trim();
    const senha = document.getElementById("cadSenha").value;
    const conf = document.getElementById("cadSenhaConf").value;
    const resultado = document.getElementById("resultadoCadastro");

    if (!nome || !email || !senha || !conf) {
        resultado.innerText = "Preencha todos os campos.";
        return;
    }

    if (senha !== conf) {
        resultado.innerText = "As senhas não coincidem.";
        return;
    }

    try {
        const cred = await createUserWithEmailAndPassword(auth, email, senha);

        await setDoc(doc(db, "usuarios", cred.user.uid), {
            nome,
            email,
            criadoEm: serverTimestamp()
        });

        resultado.innerText = "Conta criada com sucesso!";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);
    } catch (e) {
        console.log(e);
        resultado.innerText = traduzirErro(e.code);
    }
}

// ====================
// LOGIN (Firebase)
// ====================

async function entrar() {
    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value;
    const resultado = document.getElementById("resultadoLogin");

    if (!email || !senha) {
        resultado.innerText = "Preencha todos os campos.";
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, senha);

        resultado.innerText = "Login realizado!";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 500);
    } catch (e) {
        console.log(e);
        resultado.innerText = traduzirErro(e.code);
    }
}

// ====================
// MOSTRAR/OCULTAR SENHA
// ====================

function mostrarSenha(IdInput, botao) {
  const inputPass = document.getElementById(IdInput);

  if (inputPass.type === "password") {
    inputPass.type = "text";
    botao.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
  } else {
    inputPass.type = "password";
    botao.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
  }
}

// Expor para os onclick="..." do HTML (módulos não criam globais)
window.cadastrar = cadastrar;
window.entrar = entrar;
window.mostrarSenha = mostrarSenha;

// ====================
// USUÁRIO LOGADO (opcional)
// ====================

onAuthStateChanged(auth, (user) => {
  console.log(user ? "Logado: " + user.email : "Ninguém logado");
});

// ====================
// TRADUÇÃO COM VLibras
// ====================

const inputText = document.getElementById("inputText");
const btnTraduzir = document.getElementById("btnTraduzir");

if (inputText && btnTraduzir) {
  btnTraduzir.addEventListener("click", function () {
    const texto = inputText.value.trim();
    if (texto === "") return;

    let textoVlibras = document.getElementById("textoVlibras");

    if (!textoVlibras) {
      textoVlibras = document.createElement("p");
      textoVlibras.id = "textoVlibras";
      document.body.appendChild(textoVlibras);
    }

    textoVlibras.textContent = texto;
    window.VLibrasWidget.open();
  });
}