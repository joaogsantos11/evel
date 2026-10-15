const secaoAulas = document.getElementById("secaoAulas");
const telaAprendizagem = document.getElementById("telaAprendizagem");
const conteudoAula = document.getElementById("conteudoAula");
const botaoVoltar = document.getElementById("voltarLista");

const aulas = {
1: {
titulo: "O que é Libras?",
descricao: "Conheça a Língua Brasileira de Sinais e sua importância.",
conteudo: `
<section class="conteudo-aula">
<span class="etiqueta">AULA 1</span>
<h1>O que é Libras?</h1>
<p>
A Libras é a Língua Brasileira de Sinais, utilizada principalmente
por comunidades surdas no Brasil.
</p>

            <h2>Uma língua visual e espacial</h2>
            <p>
                A Libras utiliza movimentos das mãos, expressões faciais,
                movimentos corporais e o espaço para transmitir significados.
            </p>

            <div class="caixa-destaque">
                <strong>Você sabia?</strong>
                <p>
                    A Libras possui gramática própria. Ela não é simplesmente
                    uma representação de cada palavra do português com as mãos.
                </p>
            </div>
        </section>
    `
},

2: {
    titulo: "Alfabeto manual",
    descricao: "Descubra como representar letras usando as mãos.",
    conteudo: `
        <section class="conteudo-aula">
            <span class="etiqueta">AULA 2</span>
            <h1>Alfabeto manual</h1>
            <p>
                O alfabeto manual representa letras por meio de configurações
                específicas das mãos.
            </p>

            <h2>Para que ele serve?</h2>
            <p>
                Ele pode ser utilizado para soletrar nomes próprios, lugares
                e outras palavras quando necessário.
            </p>

            <div class="caixa-destaque">
                <strong>Dica de aprendizagem</strong>
                <p>
                    Pratique aos poucos, observando a configuração e a orientação
                    de cada mão. O alfabeto manual é apenas uma parte da Libras.
                </p>
            </div>
        </section>
    `
},

3: {
    titulo: "Soletrando nomes",
    descricao: "Pratique a soletração de nomes com o alfabeto manual.",
    conteudo: `
        <section class="conteudo-aula">
            <span class="etiqueta">AULA 3</span>
            <h1>Soletrando nomes</h1>
            <p>
                O alfabeto manual pode ajudar você a apresentar seu nome
                ou soletrar o nome de outra pessoa.
            </p>

            <h2>Como praticar</h2>
            <ol>
                <li>Escolha um nome curto.</li>
                <li>Identifique as letras que o compõem.</li>
                <li>Pratique cada letra com calma.</li>
                <li>Repita a sequência, buscando clareza.</li>
            </ol>

            <div class="caixa-destaque">
                <strong>Importante</strong>
                <p>
                    Na comunidade surda, algumas pessoas também possuem sinais
                    pessoais. A soletração não substitui esse contexto cultural.
                </p>
            </div>
        </section>
    `
},

4: {
    titulo: "Cumprimentos e apresentações",
    descricao: "Aprenda os primeiros passos para se apresentar em Libras.",
    conteudo: `
        <section class="conteudo-aula">
            <span class="etiqueta">AULA 4</span>
            <h1>Cumprimentos e apresentações</h1>
            <p>
                Cumprimentos e apresentações são um bom ponto de partida
                para iniciar uma conversa em Libras.
            </p>

            <h2>Prepare-se para conversar</h2>
            <p>
                Ao se comunicar, mantenha atenção visual na outra pessoa
                e observe também as expressões faciais e corporais.
            </p>

            <div class="caixa-destaque">
                <strong>Hora de praticar</strong>
                <p>
                    Prepare uma apresentação simples com seu nome e pratique
                    a soletração dele usando o alfabeto manual.
                </p>
            </div>
        </section>
    `
}

};

document.querySelectorAll("[data-abrir-aula]").forEach((botao) => {
botao.addEventListener("click", () => {
const numeroAula = botao.dataset.abrirAula;
const aula = aulas[numeroAula];

    if (!aula) return;

    conteudoAula.innerHTML = aula.conteudo;

    secaoAulas.hidden = true;
    telaAprendizagem.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

});

botaoVoltar.addEventListener("click", () => {
telaAprendizagem.hidden = true;
secaoAulas.hidden = false;
window.scrollTo({
top: 0,
behavior: "smooth"
});
});