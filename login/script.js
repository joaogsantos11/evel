function entrar() {

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    // LOGIN EMERGENCIAL
    if (senha === "123456" && email === "admin@evel.com") {

        document.getElementById("resultado").innerText =
            "Seu login está correto";

        window.location.href = "inicio.html";

    } else {

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
                window.location.href = "inicio.html";
            }

        })
        .catch(erro => {

            document.getElementById("resultado").innerText =
                "Erro ao conectar com o servidor.";

        });

    }

}

// LOGOUT
function sair() {

    window.location.href = "login.html";

}

//tradução
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
    console.log(dados);
}