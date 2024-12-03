// Seleção de elementos do DOM
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalCostElement = document.getElementById('total-cost');
const filtroCategorias = document.getElementById('filtros');
const ordenarPreco = document.getElementById('ordenar');
const inputPesquisa = document.getElementById('pesquisar');

// Inicializar o carrinho e variáveis
let produtos = [];
let cart = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
let totalCost = 0;

// Carregar produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://deisishop.pythonanywhere.com/products/")
        .then(response => response.json())
        .then(data => {
            console.log("Produtos carregados:", data);
            produtos = data;
            carregarProdutos(produtos);
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));

    fetch("https://deisishop.pythonanywhere.com/categories/")
        .then(response => response.json())
        .then(categorias => {
            criarFiltros(categorias);
        })
        .catch(error => console.error("Erro ao carregar categorias:", error));

    atualizarCesto();

    // Eventos para pesquisa e ordenação
    inputPesquisa.addEventListener('input', pesquisarProdutos);
    ordenarPreco.addEventListener('change', ordenarProdutos);
});

// Função para carregar produtos na página
function carregarProdutos(produtos) {
    productList.innerHTML = ''; // Limpa a lista antes de adicionar
    produtos.forEach(produto => {
        const productItem = document.createElement('li');
        productItem.appendChild(criarProduto(produto));
        productList.appendChild(productItem);
    });
}

// Função para criar elemento de produto
function criarProduto(produto) {
    const article = document.createElement('article');
    article.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}" width="150">
        <p>Preço: ${produto.price.toFixed(2)} €</p>
        <p>${produto.description}</p>
    `;

    const addButton = document.createElement('button');
    addButton.textContent = "+ Adicionar ao Cesto";
    addButton.addEventListener('click', () => {
        adicionarAoLocalStorage(produto);
        atualizarCesto();
    });

    article.appendChild(addButton);
    return article;
}

// Função para criar filtros
function criarFiltros(categorias) {
    filtroCategorias.innerHTML = '<option value="todas">Todas as categorias</option>';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategorias.appendChild(option);
    });

    filtroCategorias.addEventListener('change', filtrarProdutos);
}

// Função para filtrar produtos
function filtrarProdutos() {
    const categoria = filtroCategorias.value;
    if (categoria === 'todas') {
        carregarProdutos(produtos);
    } else {
        const produtosFiltrados = produtos.filter(produto => produto.category === categoria);
        carregarProdutos(produtosFiltrados);
    }
}

// Função para pesquisar produtos
function pesquisarProdutos() {
    const query = inputPesquisa.value.toLowerCase();
    const produtosFiltrados = produtos.filter(produto => produto.title.toLowerCase().includes(query));
    carregarProdutos(produtosFiltrados);
}

// Função para ordenar produtos
function ordenarProdutos() {
    const ordem = ordenarPreco.value;
    if (ordem === 'ascendente') {
        produtos.sort((a, b) => a.price - b.price);
    } else if (ordem === 'descendente')
        {
            produtos.sort((a, b) => b.price - a.price);
        }
        carregarProdutos(produtos);
    }
    
    // Função para adicionar produto ao localStorage
    function adicionarAoLocalStorage(produto) {
        cart.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(cart));
    }
    
    // Função para atualizar o cesto
    function atualizarCesto() {
        cartItems.innerHTML = '';
        totalCost = 0;
    
        cart.forEach(produto => {
            const cartArticle = criarProdutoCesto(produto);
            cartItems.appendChild(cartArticle);
            totalCost += produto.price;
        });
    
        totalCostElement.textContent = `Custo total: ${totalCost.toFixed(2)} €`;
    }
    
    // Função para criar elemento do cesto
    function criarProdutoCesto(produto) {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${produto.title}</h3>
            <img src="${produto.image}" alt="${produto.title}" width="100">
            <p>Preço: ${produto.price.toFixed(2)} €</p>
        `;
    
        const removeButton = document.createElement('button');
        removeButton.textContent = "- Remover do Cesto";
        removeButton.addEventListener('click', () => {
            removerDoLocalStorage(produto.id);
            atualizarCesto();
        });
    
        article.appendChild(removeButton);
        return article;
    }
    
    // Função para remover produto do localStorage
    function removerDoLocalStorage(id) {
        const index = cart.findIndex(produto => produto.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem('produtos-selecionados', JSON.stringify(cart));
    }