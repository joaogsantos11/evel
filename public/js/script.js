// ====================
// ELEMENTOS
// ====================

const modalLogin = document.getElementById("modalLogin");
const modalCadastro = document.getElementById("modalCadastro");

const abrirLogin = document.getElementById("abrirLogin");
const abrirLoginTraduz = document.getElementById("abrirLoginTraduz");
const abrirLoginAprender = document.getElementById("abrirLoginAprender");

const fecharLogin = document.getElementById("fecharLogin");
const fecharCadastro = document.getElementById("fecharCadastro");

const abrirCadastro = document.getElementById("abrirCadastro");
const voltarLogin = document.getElementById("voltarLogin");


// ====================
// MOSTRAR LOGIN
// ====================

function mostrarLogin() {
    if (!modalCadastro || !modalLogin) {
        return;
    }

    modalCadastro.style.display = "none";
    modalLogin.style.display = "flex";
}


// ====================
// MOSTRAR CADASTRO
// ====================

function mostrarCadastro() {
    if (!modalLogin || !modalCadastro) {
        return;
    }

    modalLogin.style.display = "none";
    modalCadastro.style.display = "flex";
}


// ====================
// ABRIR LOGIN
// ====================

if (abrirLogin) {
    abrirLogin.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarLogin();
    });
}


if (abrirLoginTraduz) {
    abrirLoginTraduz.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarLogin();
    });
}


if (abrirLoginAprender) {
    abrirLoginAprender.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarLogin();
    });
}

// ====================
// FECHAR LOGIN
// ====================

if (fecharLogin) {
    fecharLogin.addEventListener("click", function() {
        modalLogin.style.display = "none";
    });
}


// ====================
// FECHAR CADASTRO
// ====================

if (fecharCadastro) {
    fecharCadastro.addEventListener("click", function() {
        modalCadastro.style.display = "none";
    });
}

// ====================
// IR PARA CADASTRO
// ====================

if (abrirCadastro) {
    abrirCadastro.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarCadastro();
    });
}


// ====================
// VOLTAR PARA LOGIN
// ====================

if (voltarLogin) {
    voltarLogin.addEventListener("click", function(event) {
        event.preventDefault();
        mostrarLogin();
    });
}

// ====================
// CADASTRO
// ====================

async function cadastrar() {

    const campoNome = document.getElementById("cadNome");
    const campoEmail = document.getElementById("cadEmail");
    const campoSenha = document.getElementById("cadSenha");
    const campoSenhaConf = document.getElementById("cadSenhaConf");
    const resultado = document.getElementById("resultadoCadastro");

    if (!campoNome || !campoEmail || !campoSenha || !campoSenhaConf || !resultado) {
        return;
    }

    let nome = campoNome.value;
    let email = campoEmail.value;
    let senha = campoSenha.value;
    let senhaConf = campoSenhaConf.value;

    // Verificar campos vazios

    if (nome === "" || email === "" || senha === "" || senhaConf === "") {

        resultado.innerText = "Preencha todos os campos.";
        return;

    }


    // Verificar senhas

    if (senha !== senhaConf) {

        resultado.innerText = "As senhas não coincidem.";
        return;

    }


    try {

        let resposta = await fetch("http://localhost:3000/cadastro", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })

        });


        let dados = await resposta.json();


        if (resposta.ok) {

            resultado.innerText = dados.mensagem;

            // Depois de cadastrar, vai para a página inicial

            setTimeout(function() {
                window.location.href = "index.html";
            }, 1000);

        } else {

            resultado.innerText = dados.mensagem;

        }


    } catch (erro) {

        console.log(erro);

        resultado.innerText =
            "Não foi possível conectar ao servidor.";

    }

}


// ====================
// LOGIN
// ====================

async function entrar() {

    const campoEmail = document.getElementById("loginEmail");
    const campoSenha = document.getElementById("loginSenha");
    const resultado = document.getElementById("resultadoLogin");

    if (!campoEmail || !campoSenha || !resultado) {
        return;
    }

    let email = campoEmail.value;
    let senha = campoSenha.value;


    // Verificar campos vazios

    if (email === "" || senha === "") {

        resultado.innerText = "Preencha todos os campos.";
        return;

    }


    try {

        let resposta = await fetch("http://localhost:3000/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })

        });


        let dados = await resposta.json();


        if (resposta.ok) {

            resultado.innerText = dados.mensagem;

            // Login realizado

            setTimeout(function() {
                window.location.href = "index.html";
            }, 500);

        } else {

            resultado.innerText = dados.mensagem;

        }


    } catch (erro) {

        console.log(erro);

        resultado.innerText =
            "Não foi possível conectar ao servidor.";

    }

}

// ====================
// MOSTRAR/OCULTAR SENHA
// ====================

function mostrarSenha(IdInput, botao){
    var inputPass = document.getElementById(IdInput)
    

    if(inputPass.type === 'password'){
        inputPass.type = 'text'
        botao.classList.replace('bi-eye-fill','bi-eye-slash-fill')
    }
    else {
        inputPass.type = 'password'
        botao.classList.replace('bi-eye-slash-fill','bi-eye-fill')
    }
}

// ====================
// TRADUÇÃO COM VLibras
// ====================

const inputText = document.getElementById("inputText");
const btnTraduzir = document.getElementById("btnTraduzir");

if (inputText && btnTraduzir) {

    btnTraduzir.addEventListener("click", function () {

        const texto = inputText.value.trim();

        if (texto === "") {
            return;
        }

        let textoVlibras = document.getElementById("textoVlibras");

        if (!textoVlibras) {
            textoVlibras = document.createElement("p");
            textoVlibras.id = "textoVlibras";

            document.body.appendChild(textoVlibras);
        }

        textoVlibras.textContent = texto;

        // ====================
        // SELECIONA SOMENTE O TEXTO
        // ====================

        const selecao = window.getSelection();

        selecao.removeAllRanges();

        const range = document.createRange();

        range.selectNodeContents(textoVlibras);

        selecao.addRange(range);

        console.log("Texto selecionado:", selecao.toString());

        // ====================
        // ABRE O VLibras
        // ====================

        window.VLibrasWidget.open();

    });

}
