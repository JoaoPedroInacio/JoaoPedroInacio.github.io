// Seleção de elementos do DOM
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalCostElement = document.getElementById('total-cost');

let cart = [];
let totalCost = 0;

// Inicializar a lista de produtos selecionados no localStorage
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Carregar o cesto ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos);
    atualizaCesto();
});

// Função para carregar e renderizar os produtos na página
function carregarProdutos(produtos) {
    produtos.forEach((produto) => {
        const productItem = document.createElement('li');
        const productArticle = criarProduto(produto);
        productItem.appendChild(productArticle);
        productList.appendChild(productItem);
    });
}

// Função para criar o elemento de produto
function criarProduto(produto) {
    const article = document.createElement('article');
    const addButton = document.createElement('button');

    addButton.textContent = "+ Adicionar ao Cesto";
    addButton.addEventListener('click', () => {
        adicionarAoLocalStorage(produto);
        atualizaCesto();
    });

    article.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}" width="150">
        <p>Preço: ${produto.price.toFixed(2)} €</p>
        <p>${produto.description}</p>
    `;
    article.appendChild(addButton);

    return article;
}

// Função para adicionar o produto ao localStorage
function adicionarAoLocalStorage(produto) {
    const selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    selectedProducts.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));
}

// Função para atualizar o cesto na interface
function atualizaCesto() {
    const selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    cartItems.innerHTML = '';
    totalCost = 0;

    selectedProducts.forEach((produto) => {
        const cartArticle = criaProdutoCesto(produto);
        cartItems.appendChild(cartArticle);
        totalCost += produto.price;
    });

    totalCostElement.textContent = `Custo total: ${totalCost.toFixed(2)} €`;
}

// Função para criar o elemento de produto no cesto
function criaProdutoCesto(produto) {
    const article = document.createElement('article');
    const removeButton = document.createElement('button');

    removeButton.textContent = "- Remover do Cesto";
    removeButton.addEventListener('click', () => {
        removerDoLocalStorage(produto.id);
        atualizaCesto();
    });

    article.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}" width="100">
        <p>Preço: ${produto.price.toFixed(2)} €</p>
    `;
    article.appendChild(removeButton);

    return article;
}

// Função corrigida para remover apenas um produto do localStorage
function removerDoLocalStorage(id) {
    let selectedProducts = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    // Encontrar o índice do primeiro produto com o ID correspondente
    const index = selectedProducts.findIndex(produto => produto.id === id);

    // Se o produto for encontrado, removê-lo da lista
    if (index !== -1) {
        selectedProducts.splice(index, 1);
    }

    // Atualizar o localStorage e o cesto
    localStorage.setItem('produtos-selecionados', JSON.stringify(selectedProducts));
    atualizaCesto();
}