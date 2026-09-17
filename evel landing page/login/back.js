const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "evel2"
});


// ====================
// CADASTRO
// ====================

app.post("/cadastro", (req, res) => {

    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;

    let sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";

    db.query(sql, [nome, email, senha], (erro, resultado) => {

        if (erro) {

            console.log(erro);

            res.status(500).json({
                mensagem: "Erro ao cadastrar"
            });

        } else {

            res.json({
                mensagem: "Usuário cadastrado com sucesso!"
            });

        }

    });

});


// ====================
// LOGIN
// ====================

app.post("/login", (req, res) => {

    let email = req.body.email;
    let senha = req.body.senha;

    let sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";

    db.query(sql, [email, senha], (erro, resultado) => {

        if (erro) {

            console.log("ERRO NO LOGIN:");
            console.log(erro);

            res.status(500).json({
                mensagem: "Erro ao fazer login"
            });

        } else if (resultado.length > 0) {

            res.json({
                mensagem: "Login realizado com sucesso!"
            });

        } else {

            res.status(401).json({
                mensagem: "Email ou senha incorretos."
            });

        }

    });

});


// ====================
// CONEXÃO COM O BANCO
// ====================

db.connect((erro) => {

    if (erro) {

        console.error("Erro ao conectar ao banco de dados:", erro);

    } else {

        console.log("Conexão bem-sucedida ao banco de dados!");

    }

});


// ====================
// SERVIDOR
// ====================

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});


// ====================
// ROTA DE TRADUÇÃO
// ====================

app.post("/traduzir", async (req, res) => {

    console.log("CHEGOU NO BACKEND!");

    let texto = req.body.texto;

    console.log("Texto recebido:", texto);

    try {

        let url = "https://www.gov.br/translate?text=" + encodeURIComponent(texto);

        let resposta = await fetch(url);

        let dados = await resposta.json();

        console.log("Status da API:", resposta.status);
        console.log("Resposta da API:", dados);

        res.json({
            resultado: dados
        });

    } catch (erro) {

        console.log("Erro ao traduzir:");
        console.log(erro);

        res.status(500).json({
            mensagem: "Erro ao fazer a tradução."
        });

    }

});