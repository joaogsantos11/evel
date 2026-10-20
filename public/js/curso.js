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

                    <form id="quizModulo2Aula1" class="quiz-aula" data-numero-aula="1" data-respostas='{"q1":"b","q2":"a","q3":"a","q4":"b","q5":"c"}'>
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

                    <form id="quizModulo2Aula2" class="quiz-aula" data-numero-aula="2" data-respostas='{"q1":"a","q2":"b","q3":"c","q4":"c","q5":"a"}'>
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

                    <form id="quizModulo2Aula3" class="quiz-aula" data-numero-aula="3" data-respostas='{"q1":"a","q2":"b","q3":"c","q4":"b","q5":"a"}'>
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

                    <form id="quizModulo2Aula4" class="quiz-aula" data-numero-aula="4" data-respostas='{"q1":"a","q2":"b","q3":"c","q4":"c","q5":"a"}'>
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
                    <form id="quizAula1" class="quiz-aula" data-numero-aula="1" data-respostas='{"q1":"b","q2":"c","q3":"a","q4":"b","q5":"a"}'>
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

                <form id="quizAula2" class="quiz-aula" data-numero-aula="2" data-respostas='{"q1":"a","q2":"b","q3":"c","q4":"b","q5":"c"}'>
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
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 3</span>
                        <h1>Soletrando nomes</h1>
                        <p>Use o alfabeto manual para apresentar nomes próprios e pratique a soletração com clareza.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoMaos}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Por que soletrar nomes?</h2>
                        <p>O alfabeto manual, também chamado de datilologia, permite representar as letras de um nome usando configurações específicas das mãos. Ele pode ser útil quando apresentamos nosso nome, o nome de outra pessoa ou uma palavra específica.</p>
                        <p>Por exemplo, se alguém perguntar seu nome e você precisar soletrá-lo, poderá representar as letras em sequência, uma de cada vez.</p>
                        <div class="destaque-aula"><strong>Lembre-se:</strong> soletrar é um recurso da comunicação em Libras. Nem toda palavra precisa ser representada letra por letra, pois a língua também possui sinais próprios.</div>
                    </div>
                    <div class="ilustracao-lateral">${ilustracaoMaos}</div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Como soletrar um nome</h2>
                        <p>Para praticar, siga estas etapas:</p>
                        <ol class="passos-pratica">
                            <li>Escolha um nome curto, como Ana, Bia ou Leo.</li>
                            <li>Identifique as letras na ordem correta.</li>
                            <li>Observe a configuração e a orientação da mão para cada letra.</li>
                            <li>Faça as letras em sequência, sem apressar os movimentos.</li>
                            <li>Repita a prática e, se possível, peça a alguém com conhecimento de Libras para orientar você.</li>
                        </ol>
                    </div>
                </section>

                <section class="bloco-conteudo bloco-empilhado">
                    <span class="numero-secao">3</span>
                    <div class="texto-secao">
                        <h2>Pratique com nomes curtos</h2>
                        <p>Comece com nomes de duas ou três letras e avance para nomes maiores quando estiver mais confortável.</p>
                    </div>
                    <div class="cartoes-elementos">
                        <article class="cartao-elemento">
                            <div class="elemento-ilustracao">${ilustracaoMaos}</div>
                            <div><h3>ANA</h3><p>Observe a sequência A – N – A. Pratique cada letra na ordem em que aparece.</p></div>
                        </article>
                        <article class="cartao-elemento">
                            <div class="elemento-ilustracao">${ilustracaoMaos}</div>
                            <div><h3>LEO</h3><p>Identifique as três letras e tente manter a sequência clara e organizada.</p></div>
                        </article>
                        <article class="cartao-elemento">
                            <div class="elemento-ilustracao">${ilustracaoLibras}</div>
                            <div><h3>SEU NOME</h3><p>Depois de praticar os exemplos, tente soletrar seu próprio nome.</p></div>
                        </article>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">4</span>
                    <div class="texto-secao">
                        <h2>Soletração e sinais pessoais</h2>
                        <p>Em algumas situações, a soletração do nome pode ser usada para apresentar uma pessoa. Na comunidade surda, também existem sinais pessoais atribuídos a indivíduos em determinados contextos.</p>
                        <p>Não invente nem atribua um sinal pessoal a alguém por conta própria. Respeite a forma como a pessoa se identifica e, quando necessário, pergunte como ela prefere ser apresentada.</p>
                        <div class="destaque-aula"><strong>Respeito à comunidade surda:</strong> aprender Libras também envolve conhecer sua cultura e respeitar as pessoas surdas como participantes de uma comunidade linguística.</div>
                    </div>
                </section>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">5</span>
                    <div class="texto-secao">
                        <h2>O que você deve aprender nesta aula?</h2>
                        <ul class="lista-objetivos">
                            <li>Entender por que usamos a datilologia para soletrar nomes.</li>
                            <li>Representar as letras de um nome na ordem correta.</li>
                            <li>Praticar com nomes curtos antes de avançar.</li>
                            <li>Reconhecer a importância da configuração e da orientação das mãos.</li>
                            <li>Respeitar os sinais pessoais e a cultura surda.</li>
                        </ul>
                    </div>
                </section>

                <section class="atividade-aula" id="atividadeAula3">
                    <div class="atividade-cabecalho">
                        <span class="atividade-icone" aria-hidden="true">✓</span>
                        <div><span class="etiqueta etiqueta-clara">DESAFIO FINAL</span><h2>Desafio da Aula 3</h2><p>Responda às cinco questões. Você precisa acertar todas para concluir a aula.</p></div>
                    </div>
                    <form id="quizAula3" class="quiz-aula" data-numero-aula="3" data-respostas='{"q1":"b","q2":"a","q3":"c","q4":"b","q5":"a"}'>
                        <fieldset class="questao-quiz"><legend>1. Para que a datilologia pode ser utilizada?</legend><label><input type="radio" name="q1" value="a"><span>Para substituir todos os sinais da Libras.</span></label><label><input type="radio" name="q1" value="b"><span>Para representar letras, como as de nomes próprios.</span></label><label><input type="radio" name="q1" value="c"><span>Para transformar Libras em uma língua universal.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>2. Qual é uma boa forma de começar a praticar?</legend><label><input type="radio" name="q2" value="a"><span>Começar com nomes curtos e praticar uma letra de cada vez.</span></label><label><input type="radio" name="q2" value="b"><span>Fazer todas as letras o mais rápido possível.</span></label><label><input type="radio" name="q2" value="c"><span>Ignorar a configuração das mãos.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>3. Ao soletrar um nome, qual sequência devemos seguir?</legend><label><input type="radio" name="q3" value="a"><span>Uma ordem escolhida aleatoriamente.</span></label><label><input type="radio" name="q3" value="b"><span>A ordem inversa das letras.</span></label><label><input type="radio" name="q3" value="c"><span>A ordem correta das letras do nome.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>4. A comunicação em Libras consiste apenas em soletrar palavras?</legend><label><input type="radio" name="q4" value="a"><span>Sim, todas as palavras devem ser soletradas.</span></label><label><input type="radio" name="q4" value="b"><span>Não, a Libras também possui sinais e estrutura própria.</span></label><label><input type="radio" name="q4" value="c"><span>Sim, porque não existem sinais próprios.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>5. Como devemos agir em relação aos sinais pessoais?</legend><label><input type="radio" name="q5" value="a"><span>Respeitar a pessoa e não inventar um sinal para ela por conta própria.</span></label><label><input type="radio" name="q5" value="b"><span>Atribuir qualquer sinal sem perguntar.</span></label><label><input type="radio" name="q5" value="c"><span>Usar sempre a soletração como substituta de qualquer sinal pessoal.</span></label></fieldset>
                        <button class="botao botao-quiz" type="submit">Verificar respostas <span aria-hidden="true">→</span></button>
                        <p class="resultado-quiz" id="resultadoQuiz3" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
        `
    },

    4: {
       titulo: "Cumprimentos e apresentações",
        conteudo: `
            <article class="conteudo-aula">
                <header class="aula-hero-conteudo">
                    <div class="aula-hero-texto">
                        <span class="etiqueta etiqueta-clara">AULA 4</span>
                        <h1>Cumprimentos e apresentações</h1>
                        <p>Conheça estratégias para iniciar uma conversa em Libras com atenção visual e respeito.</p>
                    </div>
                    <div class="aula-hero-ilustracao">${ilustracaoLibras}</div>
                </header>

                <section class="bloco-conteudo">
                    <span class="numero-secao">1</span>
                    <div class="texto-secao">
                        <h2>Começando uma conversa</h2>
                        <p>Assim como em outras línguas, cumprimentos e apresentações ajudam a iniciar uma interação. Em Libras, a comunicação é visual e envolve sinais, expressões faciais, movimentos corporais e atenção ao espaço.</p>
                        <p>Ao encontrar uma pessoa surda, procure estabelecer contato visual de maneira natural antes de começar a sinalizar. Evite iniciar uma conversa enquanto a pessoa está olhando para outro lugar.</p>
                        <div class="destaque-aula"><strong>Comunicação visual:</strong> manter atenção visual ajuda a acompanhar os sinais e as expressões da outra pessoa.</div>
                    </div>
                    <div class="ilustracao-lateral">${ilustracaoLibras}</div>
                </section>

                <section class="bloco-conteudo bloco-empilhado">
                    <span class="numero-secao">2</span>
                    <div class="texto-secao">
                        <h2>Cuidados ao interagir</h2>
                        <p>Algumas atitudes ajudam a tornar a conversa mais respeitosa e acessível.</p>
                    </div>
                    <div class="cartoes-elementos">
                        <article class="cartao-elemento"><div class="elemento-ilustracao">${ilustracaoLibras}</div><div><h3>Chame a atenção com respeito</h3><p>Se necessário, use um gesto visual adequado ou um toque leve no ombro quando for apropriado. Evite assustar a pessoa.</p></div></article>
                        <article class="cartao-elemento"><div class="elemento-ilustracao">${ilustracaoMaos}</div><div><h3>Mantenha o rosto visível</h3><p>Evite cobrir a boca ou desviar continuamente o olhar. As expressões faciais também fazem parte da comunicação em Libras.</p></div></article>
                        <article class="cartao-elemento"><div class="elemento-ilustracao">${ilustracaoLibras}</div><div><h3>Respeite o ritmo da conversa</h3><p>Observe a outra pessoa, dê tempo para a resposta e não presuma que todas as pessoas surdas se comunicam da mesma maneira.</p></div></article>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">3</span>
                    <div class="texto-secao">
                        <h2>Apresente-se</h2>
                        <p>Uma apresentação inicial pode incluir seu nome. Se você ainda está aprendendo Libras, pode praticar a soletração do nome com o alfabeto manual estudado na aula anterior.</p>
                        <ol class="passos-pratica">
                            <li>Estabeleça contato visual de maneira respeitosa.</li>
                            <li>Use um cumprimento em Libras que você tenha aprendido corretamente.</li>
                            <li>Apresente seu nome; se necessário, pratique a soletração.</li>
                            <li>Observe a resposta da outra pessoa e dê espaço para ela se apresentar também.</li>
                        </ol>
                        <p>Para aprender a forma correta dos sinais de cumprimento, consulte materiais de ensino confiáveis ou pratique com um professor ou usuário fluente de Libras. As ilustrações desta página são decorativas e não demonstram sinais específicos.</p>
                    </div>
                </section>

                <section class="bloco-conteudo">
                    <span class="numero-secao">4</span>
                    <div class="texto-secao">
                        <h2>Respeito e acessibilidade</h2>
                        <p>Não presuma que uma pessoa surda faça leitura labial ou prefira se comunicar em português. As preferências variam de pessoa para pessoa. Se você não souber como se comunicar, pergunte com respeito qual forma de comunicação é mais adequada.</p>
                        <p>Aprender Libras é um processo contínuo. Errar faz parte do aprendizado; o importante é praticar, aceitar orientações e tratar a outra pessoa com respeito.</p>
                        <div class="destaque-aula"><strong>Uma boa conversa é uma via de mão dupla:</strong> observe, respeite o tempo da outra pessoa e esteja aberto a aprender.</div>
                    </div>
                </section>

                <section class="bloco-conteudo objetivos-aula">
                    <span class="numero-secao">5</span>
                    <div class="texto-secao">
                        <h2>O que você deve aprender nesta aula?</h2>
                        <ul class="lista-objetivos">
                            <li>Entender a importância dos cumprimentos e das apresentações.</li>
                            <li>Estabelecer atenção visual de maneira respeitosa.</li>
                            <li>Reconhecer o papel das expressões faciais e corporais.</li>
                            <li>Praticar a apresentação do próprio nome.</li>
                            <li>Respeitar as diferentes preferências de comunicação das pessoas surdas.</li>
                        </ul>
                    </div>
                </section>

                <section class="atividade-aula" id="atividadeAula4">
                    <div class="atividade-cabecalho">
                        <span class="atividade-icone" aria-hidden="true">✓</span>
                        <div><span class="etiqueta etiqueta-clara">DESAFIO FINAL</span><h2>Desafio da Aula 4</h2><p>Responda às cinco questões. Você precisa acertar todas para concluir a aula.</p></div>
                    </div>
                    <form id="quizAula4" class="quiz-aula" data-numero-aula="4" data-respostas='{"q1":"b","q2":"a","q3":"c","q4":"b","q5":"a"}'>
                        <fieldset class="questao-quiz"><legend>1. Por que a atenção visual é importante ao conversar em Libras?</legend><label><input type="radio" name="q1" value="a"><span>Porque substitui todos os sinais.</span></label><label><input type="radio" name="q1" value="b"><span>Porque ajuda a acompanhar os sinais e as expressões.</span></label><label><input type="radio" name="q1" value="c"><span>Porque elimina a necessidade de respeitar o turno de fala.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>2. Como você deve chamar a atenção de uma pessoa surda quando necessário?</legend><label><input type="radio" name="q2" value="a"><span>De maneira respeitosa, usando um recurso visual adequado.</span></label><label><input type="radio" name="q2" value="b"><span>Gritando sempre de longe.</span></label><label><input type="radio" name="q2" value="c"><span>Assustando a pessoa para que ela olhe.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>3. O que pode fazer parte de uma apresentação inicial?</legend><label><input type="radio" name="q3" value="a"><span>Evitar qualquer contato visual.</span></label><label><input type="radio" name="q3" value="b"><span>Presumir que a outra pessoa lê lábios.</span></label><label><input type="radio" name="q3" value="c"><span>Cumprimentar e apresentar seu nome.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>4. Todas as pessoas surdas preferem a mesma forma de comunicação?</legend><label><input type="radio" name="q4" value="a"><span>Sim, todas preferem leitura labial.</span></label><label><input type="radio" name="q4" value="b"><span>Não, as preferências podem variar de pessoa para pessoa.</span></label><label><input type="radio" name="q4" value="c"><span>Sim, todas usam apenas português escrito.</span></label></fieldset>
                        <fieldset class="questao-quiz"><legend>5. O que fazer se você não souber qual forma de comunicação é mais adequada?</legend><label><input type="radio" name="q5" value="a"><span>Perguntar com respeito à própria pessoa.</span></label><label><input type="radio" name="q5" value="b"><span>Presumir que ela prefere não conversar.</span></label><label><input type="radio" name="q5" value="c"><span>Continuar falando sem verificar se a comunicação funciona.</span></label></fieldset>
                        <button class="botao botao-quiz" type="submit">Verificar respostas <span aria-hidden="true">→</span></button>
                        <p class="resultado-quiz" id="resultadoQuiz4" role="status" aria-live="polite"></p>
                    </form>
                </section>
            </article>
        `}
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
    let aula;

    if (numeroModulo === 2) {
        aula = aulasModulo2[numeroAula] || aulas[numeroAula];
    } else if (numeroModulo === 1) {
        aula = aulas[numeroAula];
    } else {
        const aulasDoModulo = window["aulasModulo" + numeroModulo];
        aula = aulasDoModulo
            ? aulasDoModulo[numeroAula]
            : aulas[numeroAula];
    }

    if (!aula || !conteudoAula || !secaoAulas || !telaAprendizagem) {
        return;
    }

    conteudoAula.innerHTML = aula.conteudo;
    secaoAulas.hidden = true;
    telaAprendizagem.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
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



function verificarQuestionario(formulario) {
    const respostasCorretas = JSON.parse(formulario.dataset.respostas || "{}");
    const numeroAula = Number(formulario.dataset.numeroAula);
    const resultado = formulario.querySelector(".resultado-quiz");
    const perguntas = Object.keys(respostasCorretas);
    let acertos = 0;
    let respondidas = 0;

    perguntas.forEach((pergunta) => {
        const resposta = formulario.querySelector(
            `input[name="${pergunta}"]:checked`
        );

        if (resposta) {
            respondidas++;
            if (resposta.value === respostasCorretas[pergunta]) {
                acertos++;
            }
        }
    });

    if (!resultado || perguntas.length === 0) {
        return;
    }

    if (respondidas < perguntas.length) {
        resultado.className = "resultado-quiz resultado-aviso";
        resultado.textContent =
            `Você respondeu ${respondidas} de ${perguntas.length} questões. Complete todas antes de verificar.`;
        return;
    }

    if (acertos === perguntas.length) {
        concluirAula(numeroAula);
        resultado.className = "resultado-quiz resultado-sucesso";
        resultado.textContent =
            `Excelente! Você acertou ${acertos} de ${perguntas.length} questões. Aula concluída!`;
    } else {
        resultado.className = "resultado-quiz resultado-erro";
        resultado.textContent =
            `Você acertou ${acertos} de ${perguntas.length} questões. Revise o conteúdo e tente novamente.`;
    }
}

// Um único listener atende aos questionários inseridos dinamicamente em qualquer aula.
if (conteudoAula) {
    conteudoAula.addEventListener("submit", (evento) => {
        const formulario = evento.target;

        if (!formulario.matches("form.quiz-aula")) {
            return;
        }

        evento.preventDefault();
        verificarQuestionario(formulario);
    });
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