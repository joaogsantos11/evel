// ==========================
// LOGIN
// ==========================

function entrar() {

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    // Verifica se os campos estão vazios
    if (email === "" || senha === "") {

        document.getElementById("resultado").innerText =
            "Preencha o e-mail e a senha.";

        return;
    }

    // LOGIN EMERGENCIAL
    if (email === "admin@evel.com" && senha === "123456") {

        document.getElementById("resultado").innerText =
            "Seu login está correto";

        window.location.href = "../index.html";

        return;
    }

    // LOGIN DE USUÁRIO CADASTRADO
    fetch("http://localhost:3000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            senha: senha
        })

    })

    .then(resposta => resposta.json())

    .then(dados => {

        document.getElementById("resultado").innerText =
            dados.mensagem;

        if (dados.mensagem === "Login realizado com sucesso!") {

            window.location.href = "../index.html";

        }

    })

    .catch(erro => {

        console.log("Erro:", erro);

        document.getElementById("resultado").innerText =
            "Erro ao conectar com o servidor.";

    });

}


// ==========================
// LOGOUT
// ==========================

function sair() {

    window.location.href = "login.html";

}


// ==========================
// TRADUÇÃO
// ==========================

function traduzir() {

    let texto = document.getElementById("inputText").value;

    fetch("http://localhost:3000/traduzir", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            texto: texto
        })

    })

    .then(resposta => resposta.json())

    .then(dados => {

        console.log(dados);

    })

    .catch(erro => {

        console.log("Erro na tradução:", erro);

    });

}