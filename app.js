let score = 0;

function carregarQuiz() {
    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    perguntas.forEach((q, index) => {
        const perguntaDiv = document.createElement("div");
        perguntaDiv.classList.add("pergunta");
        perguntaDiv.innerHTML = `<h3>${index + 1}. ${q.pergunta}</h3>`;

        q.opcoes.forEach((opcao, i) => {
            const btn = document.createElement("div");
            btn.classList.add("opcao");
            btn.textContent = opcao;
            btn.onclick = () => verificarResposta(btn, i, q.correta);
            perguntaDiv.appendChild(btn);
        });

        quizContainer.appendChild(perguntaDiv);
    });
}

function verificarResposta(botao, resposta, correta) {
    const opcoes = botao.parentElement.querySelectorAll(".opcao");
    opcoes.forEach(o => o.onclick = null);

    if (resposta === correta) {
        botao.classList.add("correto");
        score++;
    } else {
        botao.classList.add("errado");
        opcoes[correta].classList.add("correto");
    }

    verificarFim();
}

function verificarFim() {
    const respondidas = document.querySelectorAll(".correto, .errado").length;
    if (respondidas === perguntas.length) {
        document.getElementById("resultado").innerHTML = 
            `<strong>Você acertou ${score} de ${perguntas.length} perguntas!</strong>`;
        document.getElementById("reiniciar").style.display = "block";
    }
}

document.getElementById("reiniciar").onclick = () => {
    score = 0;
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("reiniciar").style.display = "none";
    carregarQuiz();
};

carregarQuiz();
