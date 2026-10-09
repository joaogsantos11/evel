import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
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
// NOME DO USUÁRIO NO CABEÇALHO
// ====================

// Começa com o nome guardado no navegador (evita o "piscar" de Início → nome)
let nomeUsuario = null;
try {
    nomeUsuario = localStorage.getItem("nomeUsuario");
} catch (e) { }


let usuarioAtual = null;

function fecharMenuPerfil() {
    const menu = document.getElementById("menuPerfil");
    const botao = document.getElementById("abrirMenuPerfil");

    if (menu) {
        menu.hidden = true;
    }

    if (botao) {
        botao.setAttribute("aria-expanded", "false");
    }
}

function alternarMenuPerfil() {
    const menu = document.getElementById("menuPerfil");
    const botao = document.getElementById("abrirMenuPerfil");

    if (!menu || !botao) return;

    const vaiAbrir = menu.hidden;

    menu.hidden = !vaiAbrir;
    botao.setAttribute("aria-expanded", String(vaiAbrir));
}


document.addEventListener("click", (event) => {
    const elemento = event.target;

    if (!(elemento instanceof Element)) return;

    if (elemento.closest("#abrirMenuPerfil")) {
        event.preventDefault();
        alternarMenuPerfil();
        return;
    }

    if (!elemento.closest(".area-conta")) {
        fecharMenuPerfil();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        fecharMenuPerfil();
    }
});


document.addEventListener("click", async (event) => {
    const elemento = event.target;

    if (!(elemento instanceof Element)) return;

    const botaoSair = elemento.closest("#btnSairConta");

    if (!botaoSair) return;

    event.preventDefault();
    fecharMenuPerfil();

    try {
        await signOut(auth);

        usuarioAtual = null;
        nomeUsuario = null;

        try {
            localStorage.removeItem("nomeUsuario");
        } catch (e) { }

        atualizarCabecalho();

        window.location.href = "../index.html";

    } catch (erro) {
        console.error("Erro ao sair da conta:", erro);
        alert("Não foi possível sair da conta. Tente novamente.");
    }
});



function atualizarCabecalho() {
    const nomeFormatado = nomeUsuario
        ? nomeUsuario.charAt(0).toUpperCase() + nomeUsuario.slice(1)
        : null;

    // "Olá, Fulano!" da página inicial
    const boasVindas = document.getElementById("nomeBoasVindas");
    if (boasVindas) boasVindas.textContent = (nomeFormatado || "visitante") + "!";
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
const abrirLogin = document.getElementById("abrirLogin");

ligarEvento(abrirLogin, mostrarLogin);
ligarEvento(abrirLoginTraduz, mostrarLogin);
ligarEvento(abrirLoginAprender, mostrarLogin);
ligarEvento(abrirCadastro, mostrarCadastro);
ligarEvento(voltarLogin, mostrarLogin);

if (fecharLogin && modalLogin) {
    fecharLogin.addEventListener("click", function () {
        modalLogin.style.display = "none";
    });
}

if (fecharCadastro && modalCadastro) {
    fecharCadastro.addEventListener("click", function () {
        modalCadastro.style.display = "none";
    });
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
            window.location.href = "/public/inicio.html";
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
// USUÁRIO LOGADO → NOME NO "INÍCIO"
// ====================

onAuthStateChanged(auth, (user) => {
    console.log(user ? "Logado: " + user.email : "Ninguém logado");
});
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        nomeUsuario = null;
        try {
            localStorage.removeItem("nomeUsuario");
        } catch (e) { }
        atualizarCabecalho();
        return;
    }

    let nome = null;
    try {
        const snap = await getDoc(doc(db, "usuarios", user.uid));
        if (snap.exists()) nome = snap.data().nome;
    } catch (e) {
        console.log("Erro ao buscar nome:", e);
    }

    nome = nome || user.displayName || user.email.split("@")[0];
    const primeiro = nome.split(" ")[0];
    nomeUsuario = primeiro.charAt(0).toUpperCase() + primeiro.slice(1).toLowerCase(); // só o primeiro nome (use `nome` para o nome completo)

    try {
        localStorage.setItem("nomeUsuario", nomeUsuario);
    } catch (e) { }

    atualizarCabecalho();
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

// ===== CARREGAR O CABEÇALHO =====

async function carregarCabecalho() {
    const lugar = document.getElementById("cabecalho");
    if (!lugar) return;

    // tenta alguns caminhos possíveis
    const caminhos = [
        "/public/componentes/cabecalho.html",
        "componentes/cabecalho.html",
        "../componentes/cabecalho.html"
    ];

    for (const caminho of caminhos) {
        try {
            const resposta = await fetch(caminho);
            if (resposta.ok) {
                lugar.innerHTML = await resposta.text();

                // liga o botão de login e coloca o nome (se já houver usuário)
                ligarEvento(document.getElementById("abrirLogin"), mostrarLogin);
                atualizarCabecalho();
                return;
            }
        } catch (erro) {
            // tenta o próximo caminho
        }
    }

    // se nenhum funcionou, mostra aviso na tela para ajudar a achar o erro
    lugar.innerHTML =
        '<p style="background:#fee;color:#900;padding:10px;text-align:center;">' +
        'Erro: não consegui carregar componentes/cabecalho.html</p>';
}

document.addEventListener("DOMContentLoaded", async () => {
    await carregarCabecalho();
    atualizarCabecalho(); // cobre páginas com o cabeçalho escrito direto no HTML (ex.: index.html)
});

// ===== MENU LATERAL =====

function abrirMenu() {
    document.getElementById("menuLateral")?.classList.add("aberto");
    document.getElementById("menuOverlay")?.classList.add("visivel");
}

function fecharMenu() {
    document.getElementById("menuLateral")?.classList.remove("aberto");
    document.getElementById("menuOverlay")?.classList.remove("visivel");
}

document.addEventListener("click", (e) => {

    // Login do menu lateral: fecha o menu e usa o botão de login normal
    if (e.target.closest("#abrirLoginMobile")) {
        e.preventDefault();
        fecharMenu();
        document.getElementById("abrirLogin")?.click();
        return;
    }

    // Fecha ao clicar no X, no fundo escuro ou em qualquer link do menu
    if (
        e.target.closest(".fechar-menu") ||
        e.target.closest("#menuOverlay") ||
        e.target.closest("#menuLateral a")
    ) {
        fecharMenu();
    }
});

// Fecha com a tecla ESC
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();
});

// Se a tela voltar a ser grande, garante que o menu fique fechado
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) fecharMenu();
});