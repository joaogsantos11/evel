app.post("/usuarios", (req, res) => {

    const { nome, email, senha } = req.body;

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES (?, ?, ?)
    `;

    banco.query(
        sql,
        [nome, email, senha],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);

                return res.status(500).json({
                    erro: "Erro ao cadastrar usuário."
                });
            }

            res.status(201).json({
                mensagem: "Usuário cadastrado com sucesso!"
            });
        }
    );
});