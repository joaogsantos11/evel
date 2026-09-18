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

        window.location.href ="../index.html";
    });

}