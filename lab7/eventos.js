// Evento de mouseover em "Cristiano Ronaldo" para mostrar "GOAT"
document.getElementById("ronaldo").addEventListener("mouseover", function() {
    this.innerText = "GOAT";
});

// Evento de mouseout em "Cristiano Ronaldo" para restaurar o nome original
document.getElementById("ronaldo").addEventListener("mouseout", function() {
    this.innerText = "Cristiano Ronaldo";
});

// Evento de mouseover no título "Sporting Clube de Portugal" para mostrar "MAIOR CLUBE DO MUNDO"
document.getElementById("mainTitle").addEventListener("mouseover", function() {
    this.innerText = "MAIOR CLUBE DO MUNDO";
});

// Evento de mouseout no título para restaurar o nome original
document.getElementById("mainTitle").addEventListener("mouseout", function() {
    this.innerText = "Sporting Clube de Portugal";
});

// Evento de keyup no campo de texto para mostrar o valor digitado
document.getElementById("name").addEventListener("keyup", function() {
    if (this.value.length > 0) {
        console.log("Nome digitado: ", this.value);
    }
});

// Evento de mudança (change) no campo de texto para exibir uma mensagem no console
document.getElementById("name").addEventListener("change", function() {
    console.log("Nome alterado para:", this.value);
});

// Evento de submissão de formulário para mostrar uma mensagem
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Previne o envio do formulário para testes
    alert("Formulário enviado! Obrigado pelo seu contato.");
});