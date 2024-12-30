// Seleção de elementos do DOM
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const totalCostElement = document.getElementById('total-cost');
const filtroCategorias = document.getElementById('filtros');
const ordenarPreco = document.getElementById('ordenar');
const inputPesquisa = document.getElementById('pesquisar');
const checkoutSection = document.getElementById('checkout');

// Inicializar o carrinho e variáveis
let produtos = [];
let cart = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
let totalCost = 0;

// Carregar produtos ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
    // Carregar os produtos da API
    fetch("https://deisishop.pythonanywhere.com/products/")
        .then(response => response.json())
        .then(data => {
            produtos = data;
            carregarProdutos(produtos); // Renderizar produtos na página
        })
        .catch(error => console.error("Erro ao carregar produtos:", error));

    // Carregar categorias para os filtros
    fetch("https://deisishop.pythonanywhere.com/categories/")
        .then(response => response.json())
        .then(categorias => criarFiltros(categorias)) // Criar as opções de filtro
        .catch(error => console.error("Erro ao carregar categorias:", error));

    atualizarCesto(); // Atualizar o carrinho ao carregar a página

    // Eventos para funcionalidade de pesquisa e ordenação
    inputPesquisa.addEventListener('input', pesquisarProdutos);
    ordenarPreco.addEventListener('change', ordenarProdutos);

    // Criação dinâmica de novos elementos e funcionalidades
    criarBotaoAdicionarTodos(); // Botão para adicionar todos os produtos
    criarBotaoRemoverImagens();      // Botão para esconder descrições
    adicionarname();     // Campo para morada no checkout
});

// Função para carregar produtos na página
function carregarProdutos(produtos) {
    productList.innerHTML = ''; // Limpa a lista de produtos antes de adicionar novos
    produtos.forEach(produto => {
        const productItem = document.createElement('li');
        productItem.appendChild(criarProduto(produto)); // Cria a estrutura HTML de cada produto
        productList.appendChild(productItem);
    });
}

// Função para criar a estrutura de um produto
function criarProduto(produto) {
    const article = document.createElement('article');
    article.innerHTML = `
        <h3>${produto.title}</h3>
        <img class="image" src="${produto.image}" alt="${produto.title}" width="150">
        <p class="descricao">Preço: ${produto.price.toFixed(2)} €</p>
        <p class="descricao">${produto.description}</p>
    `;

    // Botão para adicionar o produto ao carrinho
    const addButton = document.createElement('button');
    addButton.textContent = "+ Adicionar ao Cesto";
    addButton.addEventListener('click', () => {
        adicionarAoLocalStorage(produto); // Adiciona o produto ao carrinho
        atualizarCesto(); // Atualiza o cesto após adicionar o produto
    });

    article.appendChild(addButton);
    return article;
}

// Função para criar os filtros de categorias
function criarFiltros(categorias) {
    filtroCategorias.innerHTML = '<option value="todas">Todas as categorias</option>';
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        filtroCategorias.appendChild(option);
    });

    // Adiciona o evento de filtro por categoria
    filtroCategorias.addEventListener('change', filtrarProdutos);
}

// Função para filtrar produtos por categoria
function filtrarProdutos() {
    const categoria = filtroCategorias.value;
    if (categoria === 'todas') {
        carregarProdutos(produtos); // Carrega todos os produtos
    } else {
        // Filtra os produtos pela categoria selecionada
        const produtosFiltrados = produtos.filter(produto => produto.category === categoria);
        carregarProdutos(produtosFiltrados);
    }
}

// Função para pesquisar produtos
function pesquisarProdutos() {
    const query = inputPesquisa.value.toLowerCase();
    // Pesquisa no título e descrição dos produtos
    const produtosFiltrados = produtos.filter(produto =>
        produto.title.toLowerCase().includes(query) || 
        produto.price.toFixed(2).toLowerCase().includes(query)
    );
    carregarProdutos(produtosFiltrados);
}

// Função para ordenar produtos
function ordenarProdutos() {
    const ordem = ordenarPreco.value;
    if (ordem === 'ascendente') {
        produtos.sort((a, b) => a.price - b.price); // Ordenação crescente por preço
    } else if (ordem === 'descendente') {
        produtos.sort((a, b) => b.price - a.price); // Ordenação decrescente por preço
    } else if (ordem === 'ratingAscendente') {
        produtos.sort((a, b) => a.rating.rate - b.rating.rate); // Ordenação crescente por rating
    } else if (ordem === 'ratingDescendente') {
        produtos.sort((a, b) => b.rating.rate - a.rating.rate); // Ordenação decrescente por rating
    }
    carregarProdutos(produtos);
}

// Função para adicionar um produto ao localStorage
function adicionarAoLocalStorage(produto) {
    cart.push(produto);
    localStorage.setItem('produtos-selecionados', JSON.stringify(cart));
}

// Função para atualizar o cesto
function atualizarCesto() {
    cartItems.innerHTML = '';
    totalCost = 0;

    // Renderiza cada produto no cesto
    cart.forEach(produto => {
        const cartArticle = criarProdutoCesto(produto);
        cartItems.appendChild(cartArticle);
        totalCost += produto.price; // Atualiza o custo total
    });

    totalCostElement.textContent = `Custo total: ${totalCost.toFixed(2)} €`;
}

// Função para criar a estrutura de um produto no cesto
function criarProdutoCesto(produto) {
    const article = document.createElement('article');
    article.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}" width="100">
        <p>Preço: ${produto.price.toFixed(2)} €</p>
    `;

    // Botão para remover o produto do cesto
    const removeButton = document.createElement('button');
    removeButton.textContent = "- Remover do Cesto";
    removeButton.addEventListener('click', () => {
        removerDoLocalStorage(produto.id); // Remove o produto do carrinho
        atualizarCesto(); // Atualiza o cesto após a remoção
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

// Função para criar o botão de "Adicionar Todos"
function criarBotaoAdicionarTodos() {
    const botaoAdicionarTodos = document.createElement('button');
    botaoAdicionarTodos.textContent = "Adicionar Todos";
    botaoAdicionarTodos.addEventListener('click', () => {
        produtos.forEach(produto => adicionarAoLocalStorage(produto)); // Adiciona todos os produtos ao carrinho
        atualizarCesto();
    });
    document.getElementById('submenu').appendChild(botaoAdicionarTodos);
}


function criarBotaoRemoverImagens(){
    const botaoAdicionarTodos = document.createElement('button');
    botaoAdicionarTodos.textContent = "Remover Imagens";
    
    botaoAdicionarTodos.addEventListener('click', () => {
        document.querySelectorAll('.image').forEach(produto =>{ const index = cart.findIndex(produto => produto.image === image);
        if (index !== -1) {
            cart.splice(index, 1);
        }
        localStorage.setItem('produtos-selecionados', JSON.stringify(cart));

    });

    });
    document.getElementById('submenu').appendChild(botaoAdicionarTodos);
    
}


// Função para criar o botão "Menos Info"
function criarBotaoMenosInfo() {
    const botaoMenosInfo = document.createElement('button');
    botaoMenosInfo.textContent = "Menos Info";
    botaoMenosInfo.addEventListener('click', () => {
        // Alterna a visibilidade das descrições dos produtos
        document.querySelectorAll('.descricao').forEach(descricao => {
            descricao.style.display = descricao.style.display === 'none' ? 'block' : 'none';
        });
    });
    document.getElementById('submenu').appendChild(botaoMenosInfo);
}

// Função para adicionar o campo de morada
function adicionarname() {
    const campoMorada = document.createElement('input');
    campoMorada.type = 'text';
    campoMorada.id = 'Nome';
    campoMorada.placeholder = 'Digite o seu nome';

    const labelMorada = document.createElement('p');
    labelMorada.textContent = 'nome: ';
    labelMorada.appendChild(campoMorada);

    checkoutSection.insertBefore(labelMorada, document.getElementById('botao'));

    // Adicionar funcionalidade ao botão de compra
    document.getElementById('botao').addEventListener('click', () => {
        const morada = document.getElementById('morada').value;
        const dadosCarrinho = {
            produtos: cart,
            totalCost: totalCost,
            address: morada
        };

        // Enviar os dados via POST
        fetch('https://deisishop.pythonanywhere.com/checkout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCarrinho)
        })
        .then(response => response.json())
        .then(data => {
            if (data.address) {
                const addressElement = document.createElement('p');
                addressElement.textContent = `Morada enviada: ${data.address}`;
                checkoutSection.appendChild(addressElement);
            }
        });
    });
}
