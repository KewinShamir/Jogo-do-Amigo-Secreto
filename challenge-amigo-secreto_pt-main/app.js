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

    // Verifica se o nome já está na lista
    const nomeExistente = amigos.some(amigo => amigo.nome.toLowerCase() === nome.toLowerCase());
    if (nomeExistente) {
        alert('Este nome já foi adicionado. Tente um nome diferente.');
        return;
    }

    // Adiciona o nome ao array
    amigos.push({ nome: nome, sorteado: false });

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
        li.textContent = amigo.nome;
        if (amigo.sorteado) {
            li.classList.add('sorteado');
        }
        lista.appendChild(li);
    });
}

// Função para sortear um amigo aleatório e reservar
function sortearAmigo() {
    const nomeTirador = document.getElementById('nomeTirador').value.trim();  // Nome da pessoa que está sorteando

    // Verifica se o campo do nome do sorteador está vazio
    if (nomeTirador === '') {
        alert('Por favor, insira seu nome antes de sortear.');
        return;
    }

    // Filtra amigos que ainda não foram sorteados
    const amigosNaoSorteados = amigos.filter(amigo => !amigo.sorteado);

    if (amigosNaoSorteados.length === 0) {
        alert('Não há mais amigos para sortear.');
        return;
    }

    // Gera um índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * amigosNaoSorteados.length);

    // Obtém o amigo sorteado
    const amigoSorteado = amigosNaoSorteados[indiceAleatorio];

    // Marca o amigo como sorteado
    amigoSorteado.sorteado = true;

    // Exibe o amigo sorteado junto com o nome da pessoa que está sorteando
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `${nomeTirador} sorteou: <strong>${amigoSorteado.nome}</strong>`;

    // Atualiza a lista de amigos
    exibirListaAmigos();
}

// Função para limpar a lista de amigos
function limparLista() {
    amigos = [];  // Limpa o array
    exibirListaAmigos();  // Atualiza a lista visível (deixa vazia)
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';  // Limpa o resultado de sorteio
}
