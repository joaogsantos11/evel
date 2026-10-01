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
    modalCadastro.style.display = "none";
    modalLogin.style.display = "flex";
}


// ====================
// MOSTRAR CADASTRO
// ====================

function mostrarCadastro() {
    modalLogin.style.display = "none";
    modalCadastro.style.display = "flex";
}


// ====================
// ABRIR LOGIN
// ====================

abrirLogin.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


abrirLoginTraduz.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


abrirLoginAprender.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


// ====================
// FECHAR LOGIN
// ====================

fecharLogin.addEventListener("click", function() {
    modalLogin.style.display = "none";
});


// ====================
// FECHAR CADASTRO
// ====================

fecharCadastro.addEventListener("click", function() {
    modalCadastro.style.display = "none";
});


// ====================
// IR PARA CADASTRO
// ====================

abrirCadastro.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarCadastro();
});


// ====================
// VOLTAR PARA LOGIN
// ====================

voltarLogin.addEventListener("click", function(event) {
    event.preventDefault();
    mostrarLogin();
});


// ====================
// CADASTRO
// ====================

async function cadastrar() {

    let nome = document.getElementById("cadNome").value;
    let email = document.getElementById("cadEmail").value;
    let senha = document.getElementById("cadSenha").value;
    let senhaConf = document.getElementById("cadSenhaConf").value;

    let resultado = document.getElementById("resultadoCadastro");


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

    let email = document.getElementById("loginEmail").value;
    let senha = document.getElementById("loginSenha").value;

    let resultado = document.getElementById("resultadoLogin");


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