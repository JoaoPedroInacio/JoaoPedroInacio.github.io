let totalCliques = 0;

function mudarTexto() {
    document.getElementById('textoPassa').innerText = "1. Obrigado por passares!!";
}

function restaurarTexto() {
    document.getElementById('textoPassa').innerText = "1. Passa por aqui!";
}

function pintar(cor) {
document.getElementById('textoPinta').style.color = cor;
}

function mudarCorCaixa() {
    const inputBox = document.getElementById('textoExperimenta');
    const cores = ["#FFB6C1", "#98FB98", "#ADD8E6", "#FFD700", "#FFA07A", "#DA70D6", "#20B2AA", "#FF69B4", "#ffffff"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    inputBox.style.backgroundColor = corAleatoria;
}

function mudarCor() {
    let cor = document.getElementById('corEscolha').value.toLowerCase();
    document.body.style.backgroundColor = cor;
}

function contarcliques() {
    totalCliques++;
    document.getElementById('contadorCliques').innerText = totalCliques;
}