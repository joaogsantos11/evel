const mysql = require("mysql2");

const banco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "SUA_SENHA",
    database: "evel"
});

banco.connect((erro) => {

    if (erro) {
        console.log("Erro ao conectar:", erro);
        return;
    }

    console.log("Banco de dados conectado!");
});

module.exports = banco;