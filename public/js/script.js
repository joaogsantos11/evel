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
// NOME DO USUÁRIO
// ====================

let nomeUsuario = null;

try {
    nomeUsuario = localStorage.getItem("nomeUsuario");
} catch (e) {
    // O navegador pode bloquear o armazenamento.
}

let usuarioAtual = null;

// ====================
// MENU DO PERFIL
// ====================

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

// ====================
// SAIR DA CONTA
// ====================

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
        } catch (e) {}

        atualizarCabecalho();

        window.location.href = "/public/index.html";

    } catch (erro) {
        console.error("Erro ao sair da conta:", erro);
        alert("Não foi possível sair da conta. Tente novamente.");
    }
});

// ====================
// ATUALIZAR CABEÇALHO
// ====================

function atualizarCabecalho() {
    const nomeFormatado = nomeUsuario
        ? nomeUsuario.charAt(0).toUpperCase() + nomeUsuario.slice(1)
        : null;

    const boasVindas = document.getElementById("nomeBoasVindas");

    if (boasVindas) {
        boasVindas.textContent = (nomeFormatado || "visitante") + "!";
    }
}

// ====================
// ELEMENTOS DE LOGIN
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
// MOSTRAR LOGIN E CADASTRO
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
// CADASTRO FIREBASE
// ====================

async function cadastrar() {
    const campoNome = document.getElementById("cadNome");
    const campoEmail = document.getElementById("cadEmail");
    const campoSenha = document.getElementById("cadSenha");
    const campoConf = document.getElementById("cadSenhaConf");
    const resultado = document.getElementById("resultadoCadastro");

    if (!campoNome || !campoEmail || !campoSenha || !campoConf || !resultado) {
        return;
    }

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const senha = campoSenha.value;
    const conf = campoConf.value;

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
            window.location.href = "/public/inicio.html";
        }, 1000);

    } catch (e) {
        console.log(e);
        resultado.innerText = traduzirErro(e.code);
    }
}

// ====================
// LOGIN FIREBASE
// ====================

async function entrar() {
    const campoEmail = document.getElementById("loginEmail");
    const campoSenha = document.getElementById("loginSenha");
    const resultado = document.getElementById("resultadoLogin");

    if (!campoEmail || !campoSenha || !resultado) {
        return;
    }

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

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
// MOSTRAR OU OCULTAR SENHA
// ====================

function mostrarSenha(IdInput, botao) {
    const inputPass = document.getElementById(IdInput);

    if (!inputPass || !botao) return;

    if (inputPass.type === "password") {
        inputPass.type = "text";
        botao.classList.replace("bi-eye-fill", "bi-eye-slash-fill");
    } else {
        inputPass.type = "password";
        botao.classList.replace("bi-eye-slash-fill", "bi-eye-fill");
    }
}

// Disponibiliza as funções para onclick do HTML.
window.cadastrar = cadastrar;
window.entrar = entrar;
window.mostrarSenha = mostrarSenha;

// ====================
// USUÁRIO LOGADO
// ====================

onAuthStateChanged(auth, async (user) => {
    usuarioAtual = user;

    // Protege a página de perfil.
    if (
        document.body.classList.contains("pagina-perfil") &&
        !user
    ) {
        window.location.href = "/public/index.html";
        return;
    }

    if (!user) {
        nomeUsuario = null;

        try {
            localStorage.removeItem("nomeUsuario");
        } catch (e) {}

        atualizarCabecalho();
        return;
    }

    const campoEmailPerfil = document.getElementById("perfilEmail");

    if (campoEmailPerfil) {
        campoEmailPerfil.textContent =
            user.email || "E-mail não disponível";
    }

    let nome = null;

    try {
        const snap = await getDoc(doc(db, "usuarios", user.uid));

        if (snap.exists()) {
            nome = snap.data().nome;
        }
    } catch (e) {
        console.log("Erro ao buscar nome:", e);
    }

    nome = nome || user.displayName || (user.email || "Usuário").split("@")[0];

    const primeiro = nome.split(" ")[0];

    nomeUsuario =
        primeiro.charAt(0).toUpperCase() +
        primeiro.slice(1).toLowerCase();

    const campoNomePerfil = document.getElementById("perfilNome");

    if (campoNomePerfil) {
        campoNomePerfil.textContent = nome;
    }

    if (campoEmailPerfil) {
        campoEmailPerfil.textContent =
            user.email || "E-mail não disponível";
    }

    try {
        localStorage.setItem("nomeUsuario", nomeUsuario);
    } catch (e) {}

    atualizarCabecalho();
});

// ====================
// TRADUÇÃO COM VLIBRAS
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

        if (window.VLibrasWidget) {
            window.VLibrasWidget.open();
        } else {
            console.error("O widget VLibras não está disponível.");
        }
    });
}

// ====================
// CARREGAR CABEÇALHO
// ====================

async function carregarCabecalho() {
    const lugar = document.getElementById("cabecalho");

    if (!lugar) return;

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

                ligarEvento(
                    document.getElementById("abrirLogin"),
                    mostrarLogin
                );

                atualizarCabecalho();
                return;
            }

        } catch (erro) {
            // Tenta o próximo caminho.
        }
    }

    lugar.innerHTML =
        '<p style="background:#fee;color:#900;padding:10px;text-align:center;">' +
        'Erro: não consegui carregar componentes/cabecalho.html</p>';
}

document.addEventListener("DOMContentLoaded", async () => {
    await carregarCabecalho();
    atualizarCabecalho();
});

// ====================
// MENU LATERAL MOBILE
// ====================

function abrirMenu() {
    document.getElementById("menuLateral")?.classList.add("aberto");
    document.getElementById("menuOverlay")?.classList.add("visivel");
}

function fecharMenu() {
    document.getElementById("menuLateral")?.classList.remove("aberto");
    document.getElementById("menuOverlay")?.classList.remove("visivel");
}

window.abrirMenu = abrirMenu;
window.fecharMenu = fecharMenu;

document.addEventListener("click", (e) => {
    const elemento = e.target;

    if (!(elemento instanceof Element)) return;

    if (elemento.closest("#abrirLoginMobile")) {
        e.preventDefault();
        fecharMenu();
        document.getElementById("abrirLogin")?.click();
        return;
    }

    if (
        elemento.closest(".fechar-menu") ||
        elemento.closest("#menuOverlay") ||
        elemento.closest("#menuLateral a")
    ) {
        fecharMenu();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        fecharMenu();
    }
});

// ====================
// SWIPER DOS CURSOS
// ====================

if (typeof Swiper !== "undefined") {
    const elementoSwiper = document.querySelector(".swiper");

    if (elementoSwiper) {
        const swiper = new Swiper(".swiper", {
            direction: "horizontal",
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },

            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }
} else {
    console.error("A biblioteca Swiper não foi carregada.");
}

// =============================================
// CONFIGURAÇÕES E ACESSIBILIDADE DO EVEL
// Sem modo escuro
// =============================================

const CHAVE_PREFERENCIAS_EVEL = "evelConfiguracoes";

const PREFERENCIAS_PADRAO_EVEL = {
    tamanhoTexto: "16",
    altoContraste: false,
    notificacoes: false
};

// =============================================
// LER PREFERÊNCIAS SALVAS
// =============================================

function lerPreferenciasEvel() {
    try {
        const salvas = localStorage.getItem(
            CHAVE_PREFERENCIAS_EVEL
        );

        if (!salvas) {
            return { ...PREFERENCIAS_PADRAO_EVEL };
        }

        const dados = JSON.parse(salvas);
        const tamanho = String(dados.tamanhoTexto ?? "16");

        return {
            tamanhoTexto: ["16", "18", "20"].includes(tamanho)
                ? tamanho
                : "16",

            altoContraste: dados.altoContraste === true,

            notificacoes: dados.notificacoes === true
        };

    } catch (erro) {
        console.error("Erro ao carregar preferências:", erro);

        return { ...PREFERENCIAS_PADRAO_EVEL };
    }
}

// =============================================
// APLICAR TAMANHO DAS LETRAS
// =============================================

function aplicarTamanhoTextoEvel(tamanho, raiz = document.body) {
    if (!(raiz instanceof HTMLElement)) return;

    const escala = Number(tamanho) / 16;

    if (!Number.isFinite(escala) || ![1, 1.125, 1.25].includes(escala)) {
        return;
    }

    const elementos = [];

    if (!raiz.matches("script, style, noscript, svg, i, .bi")) {
        elementos.push(raiz);
    }

    elementos.push(
        ...raiz.querySelectorAll(
            "p, h1, h2, h3, h4, h5, h6, a, button, label, span, li, " +
            "strong, em, small, select, input, textarea, td, th"
        )
    );

    const elegiveis = elementos.filter(elemento => {
        return elemento instanceof HTMLElement &&
            !elemento.matches("script, style, noscript, svg, i, .bi") &&
            !elemento.closest("svg, .bi");
    });

    // Guarda os tamanhos originais antes de aplicar a escala.
    elegiveis.forEach(elemento => {
        if (elemento.hasAttribute("data-evel-fonte-base")) return;

        const tamanhoOriginal = parseFloat(
            getComputedStyle(elemento).fontSize
        );

        if (Number.isFinite(tamanhoOriginal)) {
            elemento.setAttribute(
                "data-evel-fonte-base",
                String(tamanhoOriginal)
            );
        }
    });

    // Aplica a escala escolhida.
    elegiveis.forEach(elemento => {
        const tamanhoOriginal = parseFloat(
            elemento.getAttribute("data-evel-fonte-base")
        );

        if (Number.isFinite(tamanhoOriginal)) {
            elemento.style.fontSize =
                `${tamanhoOriginal * escala}px`;
        }
    });
}

// =============================================
// APLICAR PREFERÊNCIAS
// =============================================

function aplicarPreferenciasEvel(preferencias) {
    if (!document.body) return;

    // Não adiciona nem aplica nenhuma classe de tema escuro.
    document.body.classList.remove("tema-escuro");

    // Mantém o alto contraste como opção de acessibilidade.
    document.body.classList.toggle(
        "alto-contraste",
        preferencias.altoContraste === true
    );

    aplicarTamanhoTextoEvel(
        preferencias.tamanhoTexto || "16"
    );
}

// =============================================
// SALVAR PREFERÊNCIAS
// =============================================

function salvarPreferenciasEvel(preferencias) {
    try {
        localStorage.setItem(
            CHAVE_PREFERENCIAS_EVEL,
            JSON.stringify(preferencias)
        );

        aplicarPreferenciasEvel(preferencias);

        return true;

    } catch (erro) {
        console.error("Erro ao salvar preferências:", erro);
        return false;
    }
}

// =============================================
// INICIAR A PÁGINA DE CONFIGURAÇÕES
// =============================================

function iniciarPaginaConfiguracoesEvel() {
    const campoTamanhoTexto =
        document.getElementById("tamanhoTexto");

    const campoAltoContraste =
        document.getElementById("altoContraste");

    const campoNotificacoes =
        document.getElementById("notificacoes");

    const botaoSalvar =
        document.getElementById("btnSalvar");

    const botaoRestaurar =
        document.getElementById("btnRestaurar");

    const mensagem =
        document.getElementById("mensagemConfiguracoes");

    if (
        !campoTamanhoTexto ||
        !campoAltoContraste ||
        !campoNotificacoes ||
        !botaoSalvar ||
        !botaoRestaurar
    ) {
        return;
    }

    function preencherCampos(preferencias) {
        campoTamanhoTexto.value = preferencias.tamanhoTexto;
        campoAltoContraste.checked = preferencias.altoContraste;
        campoNotificacoes.checked = preferencias.notificacoes;
    }

    function lerCampos() {
        return {
            tamanhoTexto: ["16", "18", "20"].includes(
                campoTamanhoTexto.value
            )
                ? campoTamanhoTexto.value
                : "16",

            altoContraste: campoAltoContraste.checked,

            notificacoes: campoNotificacoes.checked
        };
    }

    // Carrega as escolhas salvas.
    const preferencias = lerPreferenciasEvel();

    preencherCampos(preferencias);
    aplicarPreferenciasEvel(preferencias);

    // Salvar preferências.
    botaoSalvar.addEventListener("click", () => {
        const preferenciasAtuais = lerCampos();
        const sucesso = salvarPreferenciasEvel(preferenciasAtuais);

        if (mensagem) {
            mensagem.textContent = sucesso
                ? "Preferências salvas com sucesso!"
                : "Não foi possível salvar as preferências.";
        }
    });

    // Restaurar padrões.
    botaoRestaurar.addEventListener("click", () => {
        const padrao = {
            ...PREFERENCIAS_PADRAO_EVEL
        };

        preencherCampos(padrao);

        const sucesso = salvarPreferenciasEvel(padrao);

        if (mensagem) {
            mensagem.textContent = sucesso
                ? "Configurações padrão restauradas!"
                : "Não foi possível restaurar as configurações.";
        }
    });
}

// =============================================
// INICIALIZAÇÃO
// =============================================

function iniciarPreferenciasEvel() {
    aplicarPreferenciasEvel(lerPreferenciasEvel());
    iniciarPaginaConfiguracoesEvel();
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarPreferenciasEvel
    );
} else {
    iniciarPreferenciasEvel();
}

// Reaplica as preferências aos elementos inseridos depois,
// como o cabeçalho carregado pelo JavaScript.
const observadorPreferenciasEvel = new MutationObserver(alteracoes => {
    const preferencias = lerPreferenciasEvel();

    alteracoes.forEach(alteracao => {
        alteracao.addedNodes.forEach(elemento => {
            if (elemento instanceof HTMLElement) {
                aplicarTamanhoTextoEvel(
                    preferencias.tamanhoTexto,
                    elemento
                );
            }
        });
    });
});

if (document.body) {
    observadorPreferenciasEvel.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Atualiza as preferências se forem alteradas em outra aba.
window.addEventListener("storage", evento => {
    if (evento.key === CHAVE_PREFERENCIAS_EVEL) {
        aplicarPreferenciasEvel(lerPreferenciasEvel());
    }
});