// =========================
// ELEMENTOS DO HTML
// =========================

const telaInicial = document.getElementById("tela-inicial");
const telaJogo = document.getElementById("tela-jogo");
const telaFinal = document.getElementById("tela-final");

const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");

const perguntaElemento = document.getElementById("pergunta");
const alternativasElemento = document.getElementById("alternativas");

const resultadoElemento = document.getElementById("resultado");
const progressoElemento = document.getElementById("progresso");
const personagemElemento = document.getElementById("personagem");

const pontuacaoElemento = document.getElementById("pontuacao");
const tituloFinal = document.getElementById("titulo-final");


// =========================
// NOMES ALEATÓRIOS
// =========================

const nomes = [
    "Gabriel",
    "Beatriz",
    "Lucas",
    "Marina",
    "Rafael",
    "Camila",
    "João",
    "Sofia"
];


// =========================
// PERGUNTAS
// =========================

const perguntas = [
    {
        texto: "Qual elemento é fundamental para controlar a quantidade de luz que entra na câmera?",
        alternativas: [
            "Abertura do diafragma",
            "Cor da fotografia",
            "Tamanho da tela",
            "Tipo de papel"
        ],
        correta: 0
    },

    {
        texto: "O que significa fotografar em um ângulo diferente?",
        alternativas: [
            "Alterar o ponto de vista da fotografia",
            "Apagar a fotografia",
            "Aumentar o tamanho do arquivo",
            "Diminuir a resolução"
        ],
        correta: 0
    },

    {
        texto: "Qual destes elementos pode ajudar a criar uma fotografia mais interessante?",
        alternativas: [
            "Composição",
            "Desorganização obrigatória",
            "Tela desligada",
            "Arquivo vazio"
        ],
        correta: 0
    },

    {
        texto: "Qual é uma das principais funções da fotografia?",
        alternativas: [
            "Registrar momentos e contar histórias",
            "Impedir que pessoas criem memórias",
            "Eliminar todas as cores",
            "Substituir completamente a realidade"
        ],
        correta: 0
    }
];


// =========================
// VARIÁVEIS DO JOGO
// =========================

let perguntaAtual = 0;
let pontuacao = 0;


// =========================
// FUNÇÃO PARA ESCOLHER NOME
// =========================

function escolherNomeAleatorio() {

    const indice = Math.floor(Math.random() * nomes.length);

    return nomes[indice];
}


// =========================
// FUNÇÃO PARA ALTERAR TEXTO
// =========================

function criarMensagem(nome) {

    const mensagem =
        "Em 2049, você precisa registrar uma fotografia especial.";

    return mensagem.replace("você", nome);
}


// =========================
// INICIAR JOGO
// =========================

function iniciarJogo() {

    perguntaAtual = 0;

    pontuacao = 0;

    telaInicial.classList.add("escondido");

    telaFinal.classList.add("escondido");

    telaJogo.classList.remove("escondido");

    const nome = escolherNomeAleatorio();

    personagemElemento.textContent = criarMensagem(nome);

    mostrarPergunta();
}


// =========================
// MOSTRAR PERGUNTA
// =========================

function mostrarPergunta() {

    const pergunta = perguntas[perguntaAtual];

    perguntaElemento.textContent = pergunta.texto;

    progressoElemento.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    alternativasElemento.innerHTML = "";

    resultadoElemento.textContent = "";

    btnProxima.classList.add("escondido");

    pergunta.alternativas.forEach((alternativa, indice) => {

        const botao = document.createElement("button");

        botao.classList.add("alternativa");

        botao.textContent = alternativa;

        botao.addEventListener("click", () => {

            verificarResposta(indice);

        });

        alternativasElemento.appendChild(botao);
    });
}


// =========================
// VERIFICAR RESPOSTA
// =========================

function verificarResposta(indiceEscolhido) {

    const pergunta = perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".alternativa");

    botoes.forEach(botao => {

        botao.disabled = true;

    });

    if (indiceEscolhido === pergunta.correta) {

        pontuacao++;

        botoes[indiceEscolhido].classList.add("correta");

        resultadoElemento.textContent =
            "🎉 Resposta correta!";

    } else {

        botoes[indiceEscolhido].classList.add("errada");

        botoes[pergunta.correta].classList.add("correta");

        resultadoElemento.textContent =
            "💡 Quase! A resposta correta está destacada em verde.";
    }

    btnProxima.classList.remove("escondido");
}


// =========================
// PRÓXIMA PERGUNTA
// =========================

function proximaPergunta() {

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }
}


// =========================
// RESULTADO FINAL
// =========================

function mostrarResultado() {

    telaJogo.classList.add("escondido");

    telaFinal.classList.remove("escondido");

    tituloFinal.textContent =
        "Missão concluída!";

    pontuacaoElemento.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
}


// =========================
// EVENTOS DOS BOTÕES
// =========================

btnIniciar.addEventListener("click", iniciarJogo);

btnProxima.addEventListener("click", proximaPergunta);

btnJogarNovamente.addEventListener("click", iniciarJogo);
