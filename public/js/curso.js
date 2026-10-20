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

function concluirAula(numeroAula) {
    localStorage.setItem(
        chaveAulaConcluida(numeroAula),
        "true"
    );

    atualizarCardsAulas();
    atualizarProgressoModulo();
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

const aulasModulo2 = {
    1: {
        titulo: "Números e contagem",
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 1</span>
                        <h1>Números e contagem</h1>
                        <p>Conheça a importância dos números na comunicação em Libras.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoMaos}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Os números na Libras</h2>
                        <p>Os números são utilizados em diversas situações cotidianas, como informar quantidades, preços, horários e datas.</p>
                        <p>Em Libras, a representação dos números é visual e pode variar conforme o contexto. É importante observar a configuração e o movimento das mãos.</p>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Quando usamos os números?</h2>
                        <ul class="lista-objetivos">
                            <li>Para informar a idade.</li>
                            <li>Para falar sobre preços e quantidades.</li>
                            <li>Para indicar datas e horários.</li>
                            <li>Para apresentar números de telefone.</li>
                        </ul>
                    </div>
                </section>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">3</span>
                    <div class="texto-secao">
                        <h2>Pratique o que aprendeu</h2>
                        <p>Imagine que você precisa informar quantos livros possui. Os números ajudam a comunicar essa quantidade de maneira clara.</p>
                        <div class="destaque-aula">
                            <strong>Dica:</strong> pratique com vídeos educativos de Libras para observar a execução correta dos sinais numéricos.
                        </div>
                    </div>
                </section>

                <section class="atividade-aula">
                    <div class="atividade-cabecalho">
                        <span class="atividade-icone" aria-hidden="true">✓</span>
                        <div>
                            <span class="etiqueta etiqueta-clara">DESAFIO FINAL</span>
                            <h2>Desafio da Aula 1</h2>
                            <p>Responda às cinco questões para concluir a aula.</p>
                        </div>
                    </div>

                    <form id="quizModulo2Aula1" class="quiz-aula">
                        <fieldset class="questao-quiz">
                            <legend>1. Para que podemos usar números na comunicação?</legend>
                            <label><input type="radio" name="q1" value="a"><span>Somente para cumprimentar.</span></label>
                            <label><input type="radio" name="q1" value="b"><span>Para informar quantidades, preços e horários.</span></label>
                            <label><input type="radio" name="q1" value="c"><span>Para substituir toda a gramática da Libras.</span></label>
                        </fieldset>

                        <fieldset class="questao-quiz">
                            <legend>2. Como a Libras é principalmente percebida?</legend>
                            <label><input type="radio" name="q2" value="a"><span>Visualmente.</span></label>
                            <label><input type="radio" name="q2" value="b"><span>Somente pela audição.</span></label>
                            <label><input type="radio" name="q2" value="c"><span>Somente pela leitura labial.</span></label>
                        </fieldset>

                        <fieldset class="questao-quiz">
                            <legend>3. Em qual situação os números podem ser úteis?</legend>
                            <label><input type="radio" name="q3" value="a"><span>Para informar um preço.</span></label>
                            <label><input type="radio" name="q3" value="b"><span>Somente para soletrar nomes.</span></label>
                            <label><input type="radio" name="q3" value="c"><span>Para substituir todas as expressões faciais.</span></label>
                        </fieldset>

                        <fieldset class="questao-quiz">
                            <legend>4. O que é importante ao aprender sinais numéricos?</legend>
                            <label><input type="radio" name="q4" value="a"><span>Ignorar a posição das mãos.</span></label>
                            <label><input type="radio" name="q4" value="b"><span>Observar a configuração e o movimento das mãos.</span></label>
                            <label><input type="radio" name="q4" value="c"><span>Pronunciar os números em voz alta.</span></label>
                        </fieldset>

                        <fieldset class="questao-quiz">
                            <legend>5. Qual é uma boa maneira de aprender a execução dos sinais?</legend>
                            <label><input type="radio" name="q5" value="a"><span>Praticar sem observar exemplos.</span></label>
                            <label><input type="radio" name="q5" value="b"><span>Evitar repetir os movimentos.</span></label>
                            <label><input type="radio" name="q5" value="c"><span>Observar materiais educativos e praticar.</span></label>
                        </fieldset>

                        <button class="botao botao-quiz" type="submit">
                            Verificar respostas <span aria-hidden="true">→</span>
                        </button>

                        <p class="resultado-quiz" id="resultadoQuizModulo2Aula1" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
     
            
        `
    },

    2: {
        titulo: "Idade e aniversário",
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 2</span>
                        <h1>Idade e aniversário</h1>
                        <p>Aprenda a conversar sobre idade e aniversário em Libras.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoMaos}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Falando sobre idade</h2>
                        <p>A idade é uma informação pessoal que pode aparecer em conversas, apresentações e cadastros.</p>
                        <p>Para comunicar a idade em Libras, é importante aprender os sinais relacionados à pergunta sobre idade e à resposta com números.</p>
                        <div class="destaque-aula">
                            <strong>Pratique:</strong> treine como perguntar a idade de alguém e como responder usando o número correspondente.
                        </div>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Falando sobre aniversário</h2>
                        <p>Conversas sobre aniversário podem envolver dia, mês, idade e comemorações.</p>
                        <p>Aprenda os sinais relacionados a aniversário e pratique a combinação com números e meses.</p>
                    </div>
                </section>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">3</span>
                    <div class="texto-secao">
                        <h2>O que você aprendeu?</h2>
                        <ul class="lista-objetivos">
                            <li>Como conversar sobre idade.</li>
                            <li>A relação entre números e informações pessoais.</li>
                            <li>Como falar sobre aniversário e datas.</li>
                            <li>A importância de observar sinais demonstrados corretamente.</li>
                        </ul>
                    </div>
                </section>

                <section class="atividade-aula">
                    <div class="atividade-cabecalho">
                        <span class="atividade-icone" aria-hidden="true">✓</span>
                        <div>
                            <span class="etiqueta etiqueta-clara">DESAFIO FINAL</span>
                            <h2>Desafio da Aula 2</h2>
                            <p>Responda às cinco questões para testar o que aprendeu.</p>
                        </div>
                    </div>

                    <form id="quizModulo2Aula2" class="quiz-aula">
                        <fieldset class="questao-quiz">
                            <legend>1. Qual informação é relacionada à idade?</legend>
                            <label><input type="radio" name="q1" value="a"><span>Quantos anos uma pessoa tem.</span></label>
                            <label><input type="radio" name="q1" value="b"><span>Apenas o nome de uma cidade.</span></label>
                            <label><input type="radio" name="q1" value="c"><span>A cor de um objeto.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>2. Qual recurso pode ajudar a informar a idade?</legend>
                            <label><input type="radio" name="q2" value="a"><span>Somente o alfabeto manual.</span></label>
                            <label><input type="radio" name="q2" value="b"><span>Números e sinais adequados ao contexto.</span></label>
                            <label><input type="radio" name="q2" value="c"><span>Apenas expressões faciais, sem sinais.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>3. Uma conversa sobre aniversário pode incluir:</legend>
                            <label><input type="radio" name="q3" value="a"><span>Somente nomes de animais.</span></label>
                            <label><input type="radio" name="q3" value="b"><span>Apenas cores.</span></label>
                            <label><input type="radio" name="q3" value="c"><span>Dia, mês e idade.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>4. Para aprender os sinais de idade, é importante:</legend>
                            <label><input type="radio" name="q4" value="a"><span>Inventar qualquer movimento.</span></label>
                            <label><input type="radio" name="q4" value="b"><span>Evitar observar outras pessoas sinalizando.</span></label>
                            <label><input type="radio" name="q4" value="c"><span>Observar exemplos corretos e praticar.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>5. Qual é uma atitude adequada ao perguntar a idade de alguém?</legend>
                            <label><input type="radio" name="q5" value="a"><span>Respeitar a pessoa e o contexto da conversa.</span></label>
                            <label><input type="radio" name="q5" value="b"><span>Exigir que todos respondam.</span></label>
                            <label><input type="radio" name="q5" value="c"><span>Ignorar a resposta.</span></label>
                        </fieldset>
                        <button class="botao botao-quiz" type="submit">Verificar respostas <span aria-hidden="true">→</span></button>
                        <p class="resultado-quiz" id="resultadoQuizModulo2Aula2" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
        `
    },

    3: {
        titulo: "Dias da semana e meses",
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 3</span>
                        <h1>Dias da semana e meses</h1>
                        <p>Aprenda a falar sobre dias, meses e compromissos em Libras.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoLibras}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Organizando o tempo</h2>
                        <p>Os dias da semana e os meses ajudam a comunicar datas, compromissos, aulas e acontecimentos.</p>
                        <p>Em Libras, aprenda os sinais correspondentes por meio de demonstrações confiáveis e pratique sua execução visual.</p>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Como praticar?</h2>
                        <ul class="lista-objetivos">
                            <li>Estude os sinais dos dias da semana.</li>
                            <li>Pratique os nomes dos meses.</li>
                            <li>Combine dias e meses para comunicar datas.</li>
                            <li>Treine frases sobre aulas e compromissos.</li>
                        </ul>
                    </div>
                </section>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">3</span>
                    <div class="texto-secao">
                        <h2>Exemplo de prática</h2>
                        <p>Imagine que alguém pergunte quando será uma aula. Você poderá praticar uma resposta que indique o dia da semana e a data.</p>
                        <div class="destaque-aula">
                            <strong>Dica:</strong> observe a sinalização em vídeo. Ler o nome de um sinal não ensina, por si só, a configuração e o movimento corretos das mãos.
                        </div>
                    </div>
                </section>

                <section class="atividade-aula">
                    <div class="atividade-cabecalho">
                        <span class="atividade-icone" aria-hidden="true">✓</span>
                        <div>
                            <span class="etiqueta etiqueta-clara">DESAFIO FINAL</span>
                            <h2>Desafio da Aula 3</h2>
                            <p>Responda às cinco questões para testar o que aprendeu.</p>
                        </div>
                    </div>

                    <form id="quizModulo2Aula3" class="quiz-aula">
                        <fieldset class="questao-quiz">
                            <legend>1. Para que servem os dias da semana e os meses em uma conversa?</legend>
                            <label><input type="radio" name="q1" value="a"><span>Para indicar datas e organizar compromissos.</span></label>
                            <label><input type="radio" name="q1" value="b"><span>Para substituir todos os números.</span></label>
                            <label><input type="radio" name="q1" value="c"><span>Somente para soletrar nomes.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>2. O que ajuda a aprender os sinais de dias e meses?</legend>
                            <label><input type="radio" name="q2" value="a"><span>Evitar praticar.</span></label>
                            <label><input type="radio" name="q2" value="b"><span>Observar demonstrações e praticar.</span></label>
                            <label><input type="radio" name="q2" value="c"><span>Memorizar apenas a grafia em português.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>3. Qual informação pode fazer parte de uma data?</legend>
                            <label><input type="radio" name="q3" value="a"><span>Somente a cor favorita.</span></label>
                            <label><input type="radio" name="q3" value="b"><span>Apenas o nome de uma pessoa.</span></label>
                            <label><input type="radio" name="q3" value="c"><span>Dia e mês.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>4. Para combinar dia e mês, devemos:</legend>
                            <label><input type="radio" name="q4" value="a"><span>Ignorar o significado da mensagem.</span></label>
                            <label><input type="radio" name="q4" value="b"><span>Usar sinais e números adequados ao contexto.</span></label>
                            <label><input type="radio" name="q4" value="c"><span>Usar somente gestos inventados.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>5. Qual é uma boa forma de praticar datas?</legend>
                            <label><input type="radio" name="q5" value="a"><span>Treinar exemplos de compromissos e acontecimentos.</span></label>
                            <label><input type="radio" name="q5" value="b"><span>Evitar repetir os sinais.</span></label>
                            <label><input type="radio" name="q5" value="c"><span>Aprender sem observar a sinalização.</span></label>
                        </fieldset>
                        <button class="botao botao-quiz" type="submit">Verificar respostas <span aria-hidden="true">→</span></button>
                        <p class="resultado-quiz" id="resultadoQuizModulo2Aula3" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
        `
    },

    4: {
        titulo: "Perguntas pessoais",
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 4</span>
                        <h1>Perguntas pessoais</h1>
                        <p>Pratique perguntas e respostas usadas em apresentações e conversas cotidianas.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoLibras}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Conhecendo outras pessoas</h2>
                        <p>Em uma conversa, podemos perguntar o nome de alguém, como a pessoa está ou outras informações que ela se sinta confortável em compartilhar.</p>
                        <p>Em Libras, perguntas podem envolver sinais, expressões faciais e elementos gramaticais visuais. Observe exemplos completos para entender como a pergunta é construída.</p>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Pratique perguntas e respostas</h2>
                        <ul class="lista-objetivos">
                            <li>Aprenda a perguntar o nome de alguém.</li>
                            <li>Pratique como dizer seu próprio nome.</li>
                            <li>Treine perguntas simples sobre como a pessoa está.</li>
                            <li>Observe a expressão facial e a direção do olhar.</li>
                        </ul>
                    </div>
                </section>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">3</span>
                    <div class="texto-secao">
                        <h2>Comunicação com respeito</h2>
                        <p>Nem toda pergunta pessoal precisa ser respondida. Respeite os limites e as escolhas de cada pessoa durante a conversa.</p>
                        <div class="destaque-aula">
                            <strong>Prática:</strong> prepare uma breve apresentação e treine perguntas simples com alguém que também esteja aprendendo Libras.
                        </div>
                    </div>
                </section>

                <section class="atividade-aula">
                    <div class="atividade-cabecalho">
                        <span class="atividade-icone" aria-hidden="true">✓</span>
                        <div>
                            <span class="etiqueta etiqueta-clara">DESAFIO FINAL</span>
                            <h2>Desafio da Aula 4</h2>
                            <p>Responda às cinco questões para testar o que aprendeu.</p>
                        </div>
                    </div>

                    <form id="quizModulo2Aula4" class="quiz-aula">
                        <fieldset class="questao-quiz">
                            <legend>1. Qual é um exemplo de pergunta pessoal?</legend>
                            <label><input type="radio" name="q1" value="a"><span>Qual é o seu nome?</span></label>
                            <label><input type="radio" name="q1" value="b"><span>Quanto pesa uma cadeira?</span></label>
                            <label><input type="radio" name="q1" value="c"><span>Qual é a cor de uma parede vazia?</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>2. O que pode participar da construção de uma pergunta em Libras?</legend>
                            <label><input type="radio" name="q2" value="a"><span>Apenas a fala em português.</span></label>
                            <label><input type="radio" name="q2" value="b"><span>Sinais e expressões faciais.</span></label>
                            <label><input type="radio" name="q2" value="c"><span>Somente a escrita.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>3. Como podemos praticar apresentações?</legend>
                            <label><input type="radio" name="q3" value="a"><span>Evitar interagir com outras pessoas.</span></label>
                            <label><input type="radio" name="q3" value="b"><span>Usar apenas gestos inventados.</span></label>
                            <label><input type="radio" name="q3" value="c"><span>Treinar perguntas e respostas simples.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>4. Qual atitude demonstra respeito numa conversa?</legend>
                            <label><input type="radio" name="q4" value="a"><span>Insistir em perguntas pessoais.</span></label>
                            <label><input type="radio" name="q4" value="b"><span>Ignorar os limites da outra pessoa.</span></label>
                            <label><input type="radio" name="q4" value="c"><span>Respeitar se alguém não quiser responder.</span></label>
                        </fieldset>
                        <fieldset class="questao-quiz">
                            <legend>5. Por que observar expressões faciais é importante?</legend>
                            <label><input type="radio" name="q5" value="a"><span>Porque elas podem contribuir para o significado e a gramática.</span></label>
                            <label><input type="radio" name="q5" value="b"><span>Porque substituem todos os sinais.</span></label>
                            <label><input type="radio" name="q5" value="c"><span>Porque não têm relação com a comunicação visual.</span></label>
                        </fieldset>
                        <button class="botao botao-quiz" type="submit">Verificar respostas <span aria-hidden="true">→</span></button>
                        <p class="resultado-quiz" id="resultadoQuizModulo2Aula4" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
        `
    }
};


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
    conteudo: `
        <article class="conteudo-aula">
            <header class="aula-hero-conteudo">
                <div class="aula-hero-texto">
                    <span class="etiqueta etiqueta-clara">AULA 2</span>
                    <h1>Alfabeto manual</h1>
                    <p>Aprenda como as letras podem ser representadas pelas mãos e descubra como utilizar o alfabeto manual na comunicação em Libras.</p>
                </div>
                <div class="aula-hero-ilustracao">${ilustracaoMaos}</div>
            </header>

            <section class="bloco-conteudo">
                <span class="numero-secao">1</span>
                <div class="texto-secao">
                    <h2>O que é o alfabeto manual?</h2>
                    <p>O alfabeto manual, também conhecido como datilologia, permite representar as letras do alfabeto por meio de configurações específicas das mãos.</p>
                    <p>Ele é utilizado, por exemplo, para soletrar nomes próprios, sobrenomes, lugares e palavras para as quais seja necessário apresentar as letras.</p>
                    <div class="destaque-aula">
                        <strong>Atenção:</strong> o alfabeto manual é uma ferramenta da Libras, mas não substitui os sinais próprios da língua.
                    </div>
                </div>
                <div class="ilustracao-lateral">${ilustracaoMaos}</div>
            </section>

            <section class="bloco-conteudo">
                <span class="numero-secao">2</span>
                <div class="texto-secao">
                    <h2>Como utilizar o alfabeto manual?</h2>
                    <p>Para soletrar uma palavra, você representa suas letras em sequência, utilizando as configurações manuais correspondentes.</p>
                    <div class="cartoes-elementos">
                        <article class="cartao-elemento">
                            <div class="elemento-ilustracao">${ilustracaoMaos}</div>
                            <div>
                                <h3>Observe a configuração</h3>
                                <p>Preste atenção ao formato dos dedos e à posição da mão em cada letra.</p>
                            </div>
                        </article>
                        <article class="cartao-elemento">
                            <div class="elemento-ilustracao">${ilustracaoLibras}</div>
                            <div>
                                <h3>Cuide da orientação</h3>
                                <p>A direção da palma e a posição da mão também são importantes para representar corretamente as letras.</p>
                            </div>
                        </article>
                        <article class="cartao-elemento">
                            <div class="elemento-ilustracao">${ilustracaoMaos}</div>
                            <div>
                                <h3>Pratique com calma</h3>
                                <p>Treine uma letra de cada vez e depois pratique sequências curtas.</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            <section class="bloco-conteudo">
                <span class="numero-secao">3</span>
                <div class="texto-secao">
                    <h2>Quando usar a datilologia?</h2>
                    <p>O alfabeto manual pode ser útil quando precisamos apresentar nomes de pessoas, cidades, instituições ou outras palavras específicas.</p>
                    <p>Entretanto, a comunicação em Libras não consiste em soletrar todas as palavras do português. A língua possui sinais, gramática e estruturas próprias.</p>
                </div>
            </section>

            <section class="bloco-conteudo objetivos-aula">
                <span class="numero-secao">4</span>
                <div class="texto-secao">
                    <h2>O que você aprendeu?</h2>
                    <ul class="lista-objetivos">
                        <li>O significado de alfabeto manual e datilologia.</li>
                        <li>Como as mãos representam letras.</li>
                        <li>A importância da configuração e da orientação das mãos.</li>
                        <li>Quando a soletração pode ser utilizada.</li>
                        <li>Por que o alfabeto manual não substitui a Libras.</li>
                    </ul>
                </div>
            </section>

            <section class="atividade-aula" id="atividadeAula2">
                <div class="atividade-cabecalho">
                    <span class="atividade-icone" aria-hidden="true">✓</span>
                    <div>
                        <span class="etiqueta etiqueta-clara">DESAFIO FINAL</span>
                        <h2>Desafio da Aula 2</h2>
                        <p>Responda às cinco questões. Você precisa acertar todas para concluir a aula.</p>
                    </div>
                </div>

                <form id="quizAula2" class="quiz-aula">
                    <fieldset class="questao-quiz">
                        <legend>1. O que é o alfabeto manual?</legend>
                        <label><input type="radio" name="q1" value="a"><span>Uma forma de representar letras utilizando as mãos.</span></label>
                        <label><input type="radio" name="q1" value="b"><span>Uma língua universal usada em todos os países.</span></label>
                        <label><input type="radio" name="q1" value="c"><span>Uma maneira de substituir todos os sinais da Libras.</span></label>
                    </fieldset>

                    <fieldset class="questao-quiz">
                        <legend>2. Qual é outro nome para a representação manual das letras?</legend>
                        <label><input type="radio" name="q2" value="a"><span>Expressão corporal.</span></label>
                        <label><input type="radio" name="q2" value="b"><span>Datilologia.</span></label>
                        <label><input type="radio" name="q2" value="c"><span>Tradução oral.</span></label>
                    </fieldset>

                    <fieldset class="questao-quiz">
                        <legend>3. Em qual situação o alfabeto manual pode ser utilizado?</legend>
                        <label><input type="radio" name="q3" value="a"><span>Para substituir toda a gramática da Libras.</span></label>
                        <label><input type="radio" name="q3" value="b"><span>Somente para conversar sobre números.</span></label>
                        <label><input type="radio" name="q3" value="c"><span>Para soletrar nomes próprios e lugares.</span></label>
                    </fieldset>

                    <fieldset class="questao-quiz">
                        <legend>4. O que devemos observar ao representar uma letra?</legend>
                        <label><input type="radio" name="q4" value="a"><span>Apenas a velocidade do movimento.</span></label>
                        <label><input type="radio" name="q4" value="b"><span>A configuração e a orientação da mão.</span></label>
                        <label><input type="radio" name="q4" value="c"><span>Apenas a expressão facial.</span></label>
                    </fieldset>

                    <fieldset class="questao-quiz">
                        <legend>5. O alfabeto manual substitui todos os sinais da Libras?</legend>
                        <label><input type="radio" name="q5" value="a"><span>Sim, todas as palavras devem ser soletradas.</span></label>
                        <label><input type="radio" name="q5" value="b"><span>Sim, porque a Libras não possui sinais próprios.</span></label>
                        <label><input type="radio" name="q5" value="c"><span>Não, ele é apenas um dos recursos utilizados na língua.</span></label>
                    </fieldset>

                    <button class="botao botao-quiz" type="submit">
                        Verificar respostas <span aria-hidden="true">→</span>
                    </button>

                    <p class="resultado-quiz" id="resultadoQuiz2" role="status" aria-live="polite"></p>
                </form>
            </section>
        </article>
    `
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
    const aula = numeroModulo === 2
        ? aulasModulo2[numeroAula] || aulas[numeroAula]
        : aulas[numeroAula];
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


concluirAula(1);

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