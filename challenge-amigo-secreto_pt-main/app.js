// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar amigos à lista
function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');  // Obtém o valor do input
    const nome = nomeInput.value.trim();  // Remove espaços extras no início e fim

    // Verifica se o campo de texto está vazio
    if (nome === '') {
        alert('Por favor, insira um nome.');
        return;
    }

    // Adiciona o nome ao array
    amigos.push(nome);

    // Limpa o campo de entrada
    nomeInput.value = '';

    // Atualiza a lista de amigos na tela
    exibirListaAmigos();
}

// Função para exibir a lista de amigos
function exibirListaAmigos() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';  // Limpa a lista antes de atualizar

    // Cria e adiciona um <li> para cada amigo na lista
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Função para sortear um amigo aleatório
function sortearAmigo() {
    if (amigos.length === 0) {
        alert('Adicione amigos à lista antes de sortear.');
        return;
    }

    // Gera um índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);

    // Obtém o nome sorteado
    const amigoSorteado = amigos[indiceAleatorio];

    // Exibe o nome sorteado
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `O amigo secreto sorteado é: <strong>${amigoSorteado}</strong>`;
}

// Função para limpar a lista de amigos
function limparLista() {
    amigos = [];  // Limpa o array
    exibirListaAmigos();  // Atualiza a lista visível (deixa vazia)
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';  // Limpa o resultado de sorteio
}
