function cadastrar() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    fetch("http://localhost:3000/cadastro", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            nome: nome,
            email: email,
            senha: senha
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {

        document.getElementById("resultado").innerText = dados.mensagem;

        if (dados.mensagem === "Usuário cadastrado com sucesso!") {
            window.location.href = "../index.html";
        }

    })
    .catch(erro => {

        console.log("Erro:", erro);

        document.getElementById("resultado").innerText =
            "Erro ao conectar com o servidor.";

    });

}