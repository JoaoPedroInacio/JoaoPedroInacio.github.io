// Evento de mouseover em "Cristiano Ronaldo" para mostrar "GOAT"
document.getElementById("ronaldo").addEventListener("mouseover", function() {
    this.innerText = "GOAT";
});
document.getElementById("ronaldo").addEventListener("mouseout", function() {
    this.innerText = "Cristiano Ronaldo";
});

// Evento de mouseover e mouseout para o segundo "Cristiano Ronaldo"
document.getElementById("ronaldo2").addEventListener("mouseover", function() {
    this.innerText = "GOAT";
});
document.getElementById("ronaldo2").addEventListener("mouseout", function() {
    this.innerText = "Cristiano Ronaldo";
});

// Evento de mouseover no título "Sporting Clube de Portugal" para mostrar "MAIOR CLUBE DO MUNDO"
document.getElementById("mainTitle").addEventListener("mouseover", function() {
    this.innerText = "MAIOR CLUBE DO MUNDO";
});
document.getElementById("mainTitle").addEventListener("mouseout", function() {
    this.innerText = "Sporting Clube de Portugal";
});