let acertos = 0;

let respondidas = {};


// ==============================
// TROCAR DE AULA
// ==============================

function mostrarAula(id) {

    let aulas = document.querySelectorAll(".lesson");

    aulas.forEach(function(aula) {

        aula.classList.remove("active");

    });

    document.getElementById(id).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// RESPONDER QUESTÃO
// ==============================

function responder(botao, correta, resultadoId) {

    // Impede responder novamente
    if (respondidas[resultadoId]) {
        return;
    }

    respondidas[resultadoId] = true;


    let resultado =
        document.getElementById(resultadoId);


    // RESPOSTA CORRETA

    if (correta) {

        resultado.innerText =
            "Resposta correta! 🎉";

        resultado.className =
            "result correct";

        acertos = acertos + 1;

    }


    // RESPOSTA INCORRETA

    else {

        resultado.innerText =
            "Resposta incorreta. Continue estudando!";

        resultado.className =
            "result wrong";

    }


    // DESATIVAR OS BOTÕES DA QUESTÃO

    let botoes =
        botao.parentElement.querySelectorAll(".option");

    botoes.forEach(function(botao) {

        botao.disabled = true;

    });


    atualizarPontuacao();
}


// ==============================
// ATUALIZAR PONTUAÇÃO
// ==============================

function atualizarPontuacao() {

    document.getElementById("pontuacao").innerText =
        "Acertos: " + acertos + " de 8";

}


// ==============================
// MOSTRAR PONTUAÇÃO
// ==============================

function mostrarPontuacao() {

    atualizarPontuacao();


    let mensagem =
        document.getElementById("mensagemFinal");


    if (acertos <= 3) {

        mensagem.innerText =
            "Continue estudando! Você está começando sua jornada em Libras.";

    }


    else if (acertos <= 6) {

        mensagem.innerText =
            "Bom trabalho! Você já aprendeu vários conceitos.";

    }


    else if (acertos <= 7) {

        mensagem.innerText =
            "Muito bom! Você demonstrou um ótimo conhecimento.";

    }


    else {

        mensagem.innerText =
            "Excelente! Você acertou todas as questões! 🎉";

    }

}


// ==============================
// REINICIAR QUIZ
// ==============================

function reiniciar() {

    acertos = 0;

    respondidas = {};


    // Ativar novamente os botões

    let botoes =
        document.querySelectorAll(".option");

    botoes.forEach(function(botao) {

        botao.disabled = false;

    });


    // Limpar mensagens

    let resultados =
        document.querySelectorAll(".result");

    resultados.forEach(function(resultado) {

        resultado.innerText = "";

        resultado.className = "result";

    });


    document.getElementById("mensagemFinal").innerText = "";


    atualizarPontuacao();

}