let totalCliques = 0;

function mudarTexto() {
    document.getElementById('textoPassa').innerText = "1. Obrigado por passares!!";
}

function restaurarTexto() {
    document.getElementById('textoPassa').innerText = "1. Passa por aqui!";
}


ddocument.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color;
        console.log("Cor selecionada:", color); // Log para depuração
        document.getElementById("textoPinta").style.color = color;
    });
});

function mudarCorCaixa() {
    const inputBox = document.getElementById('textoExperimenta');
    const cores = ["#FFB6C1", "#98FB98", "#ADD8E6", "#FFD700", "#FFA07A", "#DA70D6", "#20B2AA", "#FF69B4", "#ffffff"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    inputBox.style.backgroundColor = corAleatoria;
}

function mudarCorDropdown() {
    const cor = document.getElementById('corEscolhaDropdown').value;
    document.body.style.backgroundColor = cor;
}

function contarcliques() {
    totalCliques++;
    document.getElementById('contadorCliques').innerText = totalCliques;
}

function exibirMensagem() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const mensagem = `Olá, o ${nome} tem ${idade}!`;
    document.getElementById('mensagem').innerText = mensagem;
}
let contador = 0;
setInterval(() => {
    contador++;
    document.getElementById('contadorAutomatico').innerText = contador;
}, 1000);