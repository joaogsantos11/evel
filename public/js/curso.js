const secaoAulas = document.getElementById("secaoAulas");
const telaAprendizagem = document.getElementById("telaAprendizagem");
const conteudoAula = document.getElementById("conteudoAula");
const botaoVoltar = document.getElementById("voltarLista");
const numeroModulo = Number(
    document.body.dataset.modulo || 1
);

function chaveAulaConcluida(numeroAula) {
    // Mantém compatibilidade com o progresso antigo do módulo 1.
    if (numeroModulo === 1) {
        return `aula${numeroAula}Concluida`;
    }

    return `modulo${numeroModulo}_aula${numeroAula}Concluida`;
}

const ilustracaoLibras = `
<svg class="ilustracao-svg" viewBox="0 0 360 230" role="img" aria-label="Ilustração de uma pessoa se comunicando em Libras">
    <rect x="8" y="8" width="344" height="214" rx="26" fill="#ededff"/>
    <circle cx="182" cy="108" r="78" fill="#d9ddff"/>
    <path d="M111 202c8-43 29-62 69-62s64 19 72 62" fill="#2929c7"/>
    <path d="M143 87c-5-37 14-58 41-58 31 0 48 23 42 58l-6 32h-70z" fill="#17174f"/>
    <ellipse cx="184" cy="88" rx="35" ry="43" fill="#ffc5a7"/>
    <path d="M149 81c-2-27 12-47 38-47 21 0 37 13 40 35-17-2-27-11-34-22-8 17-23 27-44 34" fill="#17174f"/>
    <circle cx="172" cy="88" r="3.5" fill="#19194a"/><circle cx="198" cy="88" r="3.5" fill="#19194a"/>
    <path d="M176 106q9 9 19 0" fill="none" stroke="#b64e4e" stroke-width="3" stroke-linecap="round"/>
    <path d="M121 160l-30-23-13 9 27 33 31 2" fill="#ffc5a7"/>
    <path d="M78 146l-6-17m14 16-1-21m8 24 4-17" stroke="#ffc5a7" stroke-width="9" stroke-linecap="round"/>
    <path d="M235 155l24-25 13 8-17 29-24 8" fill="#ffc5a7"/>
    <path d="M264 132l4-20m4 24 10-17m-3 25 15-11" stroke="#ffc5a7" stroke-width="8" stroke-linecap="round"/>
    <path d="M53 71l-10-7m17-6-1-12m14 17 8-10M293 74l12-7m-16-8 1-12m-13 17-8-10" stroke="#5656e8" stroke-width="4" stroke-linecap="round"/>
</svg>`;

const ilustracaoMaos = `
<svg class="ilustracao-svg ilustracao-maos" viewBox="0 0 300 150" role="img" aria-label="Ilustração de mãos sinalizando">
    <rect x="4" y="4" width="292" height="142" rx="20" fill="#e5eaff"/>
    <path d="M86 122V77q0-8 7-8t7 8V51q0-8 7-8t7 8v24-36q0-8 7-8t7 8v39-27q0-8 7-8t7 8v41l7-16q4-8 11-4t3 12l-14 30q-5 11-19 11z" fill="#ffc5a7" stroke="#e89a7c" stroke-width="2" stroke-linejoin="round"/>
    <path d="M196 122V87q0-8 7-8t7 8V68q0-8 7-8t7 8v22-15q0-8 7-8t7 8v24l6-10q4-6 10-2t2 10l-11 21q-5 10-17 10z" fill="#ffd0b4" stroke="#e89a7c" stroke-width="2" stroke-linejoin="round"/>
    <path d="M151 30l-4-13m17 17 8-12m-1 27 13-4" stroke="#3535c9" stroke-width="4" stroke-linecap="round"/>
</svg>`;

const aulas = {
    1: {
        titulo: "O que é Libras?",
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 1</span>
                        <h1>O que é Libras?</h1>
                        <p>Conheça a Língua Brasileira de Sinais e sua importância para a comunicação e a inclusão.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoLibras}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Introdução: o que é Libras?</h2>
                        <p>A Língua Brasileira de Sinais (Libras) é uma língua visual e espacial utilizada principalmente pelas comunidades surdas no Brasil. Por meio dela, as pessoas podem se comunicar, compartilhar informações, expressar sentimentos e construir relações sociais.</p>
                        <p>Diferentemente do português falado, a Libras utiliza principalmente as mãos, as expressões faciais, os movimentos corporais e o espaço para transmitir significados.</p>
                        <div class="destaque-aula"><strong>A Libras é uma língua completa.</strong> Ela possui gramática e estrutura próprias. Não é simplesmente uma tradução palavra por palavra do português para gestos.</div>
                    </div>
                    <div class="ilustracao-lateral">${ilustracaoLibras}</div>
                </section>

                <section class="bloco-conteudo bloco-empilhado">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Como a Libras funciona?</h2>
                        <p>Vários elementos visuais atuam juntos para formar os sinais e transmitir mensagens.</p>
                    </div>
                    <div class="cartoes-elementos">
                        <article class="cartao-elemento"><div class="elemento-ilustracao">${ilustracaoMaos}</div><div><h3>Configuração e movimento das mãos</h3><p>A forma das mãos, sua orientação, a localização e os movimentos são elementos importantes para construir os sinais.</p></div></article>
                        <article class="cartao-elemento"><div class="elemento-ilustracao">${ilustracaoLibras}</div><div><h3>Expressões faciais</h3><p>As expressões do rosto podem transmitir emoções e também desempenhar funções gramaticais, ajudando a diferenciar significados.</p></div></article>
                        <article class="cartao-elemento"><div class="elemento-ilustracao">${ilustracaoLibras}</div><div><h3>Corpo e espaço</h3><p>A posição do corpo e a utilização do espaço à frente do sinalizante também contribuem para a comunicação.</p></div></article>
                    </div>
                </section>

                <div class="grade-dupla-aula">
                    <section class="bloco-conteudo bloco-compacto">
                        <span class="numero-secao">3</span>
                        <div class="texto-secao"><h2>Libras não é universal</h2><p>Cada país pode ter sua própria língua de sinais. A Libras é utilizada no Brasil, enquanto a ASL (American Sign Language) é utilizada nos Estados Unidos e em partes do Canadá.</p><p>As línguas de sinais não são todas iguais. A Libras também apresenta variações regionais, culturais e de uso.</p></div>
                    </section>
                    <section class="bloco-conteudo bloco-compacto">
                        <span class="numero-secao">4</span>
                        <div class="texto-secao"><h2>A importância da Libras para a inclusão</h2><p>Aprender Libras ajuda a ampliar a comunicação entre pessoas surdas e ouvintes. Isso contribui para uma sociedade mais acessível em escolas, universidades, locais de trabalho, serviços públicos e espaços de convivência.</p><p>A inclusão também envolve respeitar a cultura surda, reconhecer a identidade das pessoas surdas e promover a acessibilidade.</p></div>
                    </section>
                </div>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">5</span>
                    <div class="texto-secao"><h2>O que você deve aprender nesta aula?</h2><p>Ao terminar, você deverá ser capaz de:</p>
                        <ul class="lista-objetivos"><li>Explicar o que é Libras.</li><li>Reconhecer que Libras possui gramática própria.</li><li>Identificar o papel das mãos, das expressões faciais e do corpo.</li><li>Compreender que existem diferentes línguas de sinais.</li><li>Reconhecer a importância da Libras para a comunicação e a inclusão.</li></ul>
                    </div>
                </section>

                <section class="atividade-aula" id="atividadeAula1">
                    <div class="atividade-cabecalho"><span class="atividade-icone" aria-hidden="true">✓</span><div><span class="etiqueta etiqueta-clara">DESAFIO FINAL</span><h2>Desafio da Aula 1</h2><p>Responda às cinco questões para testar o que aprendeu.</p></div></div>
                    <form id="quizAula1" class="quiz-aula">
                        <fieldset class="questao-quiz"><legend>1. O que é Libras?</legend><label><input type="radio" name="q1" value="a"><span>Uma língua universal utilizada em todos os países.</span></label><label><input type="radio" name="q1" value="b"><span>Uma língua visual e espacial utilizada no Brasil.</span></label><label><input type="radio" name="q1" value="c"><span>Uma representação gestual do português.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>2. Quais elementos participam da comunicação em Libras?</legend><label><input type="radio" name="q2" value="a"><span>Apenas as mãos.</span></label><label><input type="radio" name="q2" value="b"><span>Apenas os movimentos dos braços.</span></label><label><input type="radio" name="q2" value="c"><span>Mãos, expressões faciais, corpo e espaço.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>3. A Libras possui gramática própria?</legend><label><input type="radio" name="q3" value="a"><span>Sim.</span></label><label><input type="radio" name="q3" value="b"><span>Não.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>4. A língua de sinais é igual em todos os países?</legend><label><input type="radio" name="q4" value="a"><span>Sim, todas são iguais.</span></label><label><input type="radio" name="q4" value="b"><span>Não, existem diferentes línguas de sinais.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>5. Aprender Libras pode ajudar uma pessoa ouvinte a se comunicar com uma pessoa surda?</legend><label><input type="radio" name="q5" value="a"><span>Sim, amplia as possibilidades de comunicação e inclusão.</span></label><label><input type="radio" name="q5" value="b"><span>Não, Libras serve apenas para ambientes escolares.</span></label></fieldset>
                        <button class="botao botao-quiz" type="submit">Verificar respostas <span aria-hidden="true">→</span></button>
                        <p class="resultado-quiz" id="resultadoQuiz" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
        `
    },
    2: {
        titulo: "Alfabeto manual",
        conteudo: `<article class="conteudo-aula aula-placeholder"><span class="etiqueta etiqueta-clara">AULA 2</span><h1>Alfabeto manual</h1><div class="ilustracao-destaque">${ilustracaoMaos}</div><h2>Representando letras com as mãos</h2><p>O alfabeto manual representa letras por meio de configurações específicas das mãos. Ele pode ser utilizado para soletrar nomes próprios, lugares e outras palavras quando necessário.</p><div class="destaque-aula"><strong>Dica de aprendizagem:</strong> pratique aos poucos, observando a configuração e a orientação de cada mão. O alfabeto manual é apenas uma parte da Libras.</div><p>O conteúdo completo desta aula será desenvolvido na próxima etapa.</p></article>`
    },
    3: {
        titulo: "Soletrando nomes",
        conteudo: `<article class="conteudo-aula aula-placeholder"><span class="etiqueta etiqueta-clara">AULA 3</span><h1>Soletrando nomes</h1><div class="ilustracao-destaque">${ilustracaoLibras}</div><h2>Pratique a soletração</h2><p>O alfabeto manual pode ajudar você a apresentar seu nome ou soletrar o nome de outra pessoa.</p><ol class="passos-pratica"><li>Escolha um nome curto.</li><li>Identifique as letras que o compõem.</li><li>Pratique cada letra com calma.</li><li>Repita a sequência, buscando clareza.</li></ol><div class="destaque-aula"><strong>Importante:</strong> na comunidade surda, algumas pessoas também possuem sinais pessoais. A soletração não substitui esse contexto cultural.</div><p>O conteúdo completo desta aula será desenvolvido na próxima etapa.</p></article>`
    },
    4: {
        titulo: "Cumprimentos e apresentações",
        conteudo: `<article class="conteudo-aula aula-placeholder"><span class="etiqueta etiqueta-clara">AULA 4</span><h1>Cumprimentos e apresentações</h1><div class="ilustracao-destaque">${ilustracaoLibras}</div><h2>Começando uma conversa</h2><p>Cumprimentos e apresentações são um bom ponto de partida para iniciar uma conversa em Libras.</p><p>Ao se comunicar, mantenha atenção visual na outra pessoa e observe também as expressões faciais e corporais.</p><div class="destaque-aula"><strong>Hora de praticar:</strong> prepare uma apresentação simples com seu nome e pratique a soletração dele usando o alfabeto manual.</div><p>O conteúdo completo desta aula será desenvolvido na próxima etapa.</p></article>`
    }
};

function atualizarProgressoModulo() {
    const totalAulas = 4;
    let aulasConcluidas = 0;

    for (let numero = 1; numero <= totalAulas; numero++) {
        const concluida =
            localStorage.getItem(chaveAulaConcluida(numero)) === "true";

        if (concluida) {
            aulasConcluidas++;
        }
    }

    const percentual = Math.round(
        (aulasConcluidas / totalAulas) * 100
    );

    const textoProgresso = document.getElementById("progressoTexto");
    const percentualProgresso = document.getElementById("progressoPercentual");
    const barraProgresso = document.getElementById("progressoBarra");

    if (textoProgresso) {
        textoProgresso.textContent =
            `${aulasConcluidas} de ${totalAulas} aulas concluídas`;
    }

    if (percentualProgresso) {
        percentualProgresso.textContent = `${percentual}%`;
    }

    if (barraProgresso) {
        barraProgresso.style.width = `${percentual}%`;
    }
}

function abrirAula(numeroAula) {
    const aula = aulas[numeroAula];
    if (!aula || !conteudoAula || !secaoAulas || !telaAprendizagem) return;

    conteudoAula.innerHTML = aula.conteudo;
    secaoAulas.hidden = true;
    telaAprendizagem.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (numeroAula === "1" || numeroAula === 1) {
        const quiz = document.getElementById("quizAula1");
        if (quiz) quiz.addEventListener("submit", verificarQuizAula1);
    }
}


function atualizarCardsAulas() {
    document.querySelectorAll("[data-abrir-aula]").forEach((card) => {
        const numeroAula = Number(card.dataset.abrirAula);

        const concluida =
            localStorage.getItem(
                chaveAulaConcluida(numeroAula)
            ) === "true";

        const status = card.querySelector(".aula-status");

        card.classList.toggle("aula-concluida", concluida);

        if (status) {
            status.textContent = concluida ? "✓" : "→";

            status.setAttribute(
                "aria-label",
                concluida ? "Aula concluída" : "Abrir aula"
            );
        }
    });
}


function verificarQuizAula1(evento) {
    evento.preventDefault();
    const formulario = evento.currentTarget;
    const respostasCorretas = { q1: "b", q2: "c", q3: "a", q4: "b", q5: "a" };
    const resultado = document.getElementById("resultadoQuiz");
    let acertos = 0;
    let respondidas = 0;

    Object.entries(respostasCorretas).forEach(([pergunta, correta]) => {
        const resposta = formulario.querySelector(`input[name="${pergunta}"]:checked`);
        if (resposta) {
            respondidas++;
            if (resposta.value === correta) acertos++;
        }
    });

    if (respondidas < 5) {
        resultado.className = "resultado-quiz resultado-aviso";
        resultado.textContent = `Você respondeu ${respondidas} de 5 questões. Complete todas antes de verificar.`;
        return;
    }


    if (acertos === 5) {
        localStorage.setItem(
    chaveAulaConcluida(1),
    "true"
);

        atualizarCardAula1();
        atualizarProgressoModulo();

        resultado.className = "resultado-quiz resultado-sucesso";
        resultado.textContent =
            `Excelente! Você acertou ${acertos} de 5 questões. Aula concluída!`;
    } else {
        resultado.className = "resultado-quiz resultado-erro";
        resultado.textContent =
            `Você acertou ${acertos} de 5 questões. Revise o conteúdo e tente novamente.`;
    }

}

document.querySelectorAll("[data-abrir-aula]").forEach((botao) => {
    botao.addEventListener("click", () => abrirAula(botao.dataset.abrirAula));
});

if (botaoVoltar) {
    botaoVoltar.addEventListener("click", () => {
        telaAprendizagem.hidden = true;
        secaoAulas.hidden = false;
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

atualizarCardsAulas();
atualizarProgressoModulo();