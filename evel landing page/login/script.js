async function cadastrar() {

    const nome = document.getElementById("cadNome").value;
    const email = document.getElementById("cadEmail").value;
    const senha = document.getElementById("cadSenha").value;
    const senha2 = document.getElementById("cadSenha2").value;

    if (senha !== senha2) {
        alert("As senhas não são iguais!");
        return;
    }

    const resposta = await fetch("http://localhost:3000/usuarios", {
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

    const dados = await resposta.json();

    if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
    } else {
        alert(dados.erro);
    }
}