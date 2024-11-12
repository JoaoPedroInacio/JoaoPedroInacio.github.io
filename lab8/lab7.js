let totalCliques = 0;

// Função para mudar o texto ao passar o mouse
function mudarTexto() {
    document.getElementById('item1').innerText = "Obrigado por passares!!";
}

// Função para restaurar o texto original
function restaurarTexto() {
    document.getElementById('item1').innerText = "Passa por aqui!";
}

// Função para mudar a cor do texto com os botões
document.querySelectorAll("button[data-color]").forEach((button) => {
    button.addEventListener("click", () => {
        const color = button.dataset.color;
        console.log("Cor selecionada:", color);
        const textoPinta = document.getElementById('item2'); // Seleciona o próprio item da lista
        textoPinta.style.color = color;
    });
});

// Função para mudar a cor de fundo da caixa de texto
function mudarCorCaixa() {
    const inputBox = document.querySelector('#textoExperimenta');
    const cores = ["#FFB6C1", "#98FB98", "#ADD8E6", "#FFD700", "#FFA07A", "#DA70D6", "#20B2AA", "#FF69B4", "#ffffff"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    inputBox.style.backgroundColor = corAleatoria;
}

// Função para mudar a cor do fundo da página com o dropdown
function mudarCorDropdown() {
    const cor = document.querySelector('#corEscolhaDropdown').value;
    document.body.style.backgroundColor = cor;
}

// Função para contar cliques no botão
function contarcliques() {
    totalCliques++;
    document.querySelector('#contadorCliques').innerText = totalCliques;
}

// Função para exibir mensagem com nome e idade
function exibirMensagem() {
    const nome = document.querySelector('#nome').value;
    const idade = document.querySelector('#idade').value;
    const mensagem = `Olá, o ${nome} tem ${idade}!`;
    document.querySelector('#mensagem').innerText = mensagem;
}

// Contador automático que atualiza a cada segundo
let contador = 0;
setInterval(() => {
    contador++;
    document.querySelector('#contadorAutomatico').innerText = contador;
}, 1000);