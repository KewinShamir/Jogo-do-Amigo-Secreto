let amigos = [];
let listaConfirmada = [];
let jaSorteou = new Set();
let sorteados = new Map();

function adicionarAmigo() {
    let nome = document.getElementById("amigo").value.trim();
    if (nome && !amigos.includes(nome)) {
        amigos.push(nome);
        atualizarLista();
        document.getElementById("amigo").value = "";
    }
}

function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    amigos.forEach(nome => {
        let li = document.createElement("li");
        li.textContent = nome;

        if (jaSorteou.has(nome)) {
            li.classList.add("sorteado");
        }

        lista.appendChild(li);
    });
}

function limparLista() {
    amigos = [];
    listaConfirmada = [];
    jaSorteou.clear();
    sorteados.clear();
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("nomeTirador").innerHTML = '<option value="">Selecione seu nome</option>';
    document.getElementById("resultado").innerHTML = "";
}

function confirmarLista() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 participantes.");
        return;
    }
    listaConfirmada = [...amigos];
    atualizarSelect();
    alert("Lista confirmada! Agora escolha quem está sorteando.");
}

function atualizarSelect() {
    let select = document.getElementById("nomeTirador");
    select.innerHTML = '<option value="">Selecione seu nome</option>';
    listaConfirmada.forEach(nome => {
        let option = document.createElement("option");
        option.value = nome;
        option.textContent = nome;
        select.appendChild(option);
    });
}

function sortearAmigo() {
    let nomeTirador = document.getElementById("nomeTirador").value;

    if (!nomeTirador) {
        alert("Selecione seu nome antes de sortear.");
        return;
    }

    if (jaSorteou.has(nomeTirador)) {
        alert(`${nomeTirador}, você já sorteou um nome!`);
        return;
    }

    let amigosDisponiveis = listaConfirmada.filter(nome => nome !== nomeTirador && !Array.from(sorteados.values()).includes(nome));

    if (amigosDisponiveis.length === 0) {
        alert("Não há mais participantes disponíveis para serem sorteados.");
        return;
    }

    let sorteado = amigosDisponiveis[Math.floor(Math.random() * amigosDisponiveis.length)];

    sorteados.set(nomeTirador, sorteado);
    jaSorteou.add(nomeTirador);

    // Criando o botão de revelação do sorteio
    let resultado = document.getElementById("resultado");
    let li = document.createElement("li");
    li.innerHTML = `${nomeTirador} sorteou <button onclick="revelarSorteado(this, '${sorteado}')">Revelar</button>`;
    resultado.appendChild(li);

    atualizarLista();

    // Agora verifica se **todos** já sortearam e se **todos os nomes foram sorteados corretamente**
    if (jaSorteou.size === amigos.length && sorteados.size === amigos.length) {
        alert("Todos já sortearam!");
    }
}

function revelarSorteado(botao, nomeSorteado) {
    botao.parentElement.innerHTML = botao.parentElement.textContent.replace("Revelar", nomeSorteado);
}
