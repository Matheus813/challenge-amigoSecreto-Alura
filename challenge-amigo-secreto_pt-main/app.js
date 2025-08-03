// Lista para guardar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    let campoAmigo = document.getElementById('amigo');
    let nomeAmigo = campoAmigo.value.trim();

    // Verifica se o campo não está vazio
    if (nomeAmigo == '') {
        alert('Informe o nome do amigo!');
        return; // Para a execução da função aqui
    }

    // Verifica se o nome já existe na lista
    if (amigos.includes(nomeAmigo)) {
        alert('Nome já adicionado!');
        return;
    }
    
    // Adiciona o amigo na lista e atualiza a exibição na tela
    amigos.push(nomeAmigo);

    let listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.textContent = amigos.join(', '); // Mostra os amigos separados por vírgula

    campoAmigo.value = ''; // Limpa o campo de texto
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    // Verifica se há amigos suficientes
    if (amigos.length < 4) {
        alert('Adicione pelo menos 4 amigos!');
        return;
    }

    // Embaralha a lista de amigos. A função está mais abaixo
    let sorteados = embaralhar(amigos.slice()); // Usamos .slice() para criar uma cópia da lista

    let listaResultado = document.getElementById('resultado');
    listaResultado.innerHTML = ''; // Limpa o resultado anterior

    // Loop para criar os pares (quem tira quem)
    for (let i = 0; i < amigos.length; i++) {
        // O amigo na posição 'i' da lista original
        let doador = amigos[i];
        // O amigo na posição 'i' da lista embaralhada
        let receptor = sorteados[i];

        // Adiciona a linha do sorteio na tela
        let itemSorteio = document.createElement('p');
        itemSorteio.textContent = doador + ' → ' + receptor;
        listaResultado.appendChild(itemSorteio);
    }
}

// Função para embaralhar uma lista (versão simplificada)
function embaralhar(lista) {
    let listaEmbaralhada;
    let sorteioValido = false;

    // Repete o sorteio até que ninguém tire a si mesmo
    while (!sorteioValido) {
        // Cria uma cópia embaralhada da lista
        listaEmbaralhada = lista.slice().sort(() => Math.random() - 0.5);
        
        // Assume que o sorteio é válido até provar o contrário
        sorteioValido = true; 

        // Verifica se alguém tirou a si mesmo
        for (let i = 0; i < lista.length; i++) {
            if (lista[i] === listaEmbaralhada[i]) {
                sorteioValido = false; // Opa, sorteio inválido!
                break; // Para a verificação e tenta embaralhar de novo
            }
        }
    }
    
    return listaEmbaralhada;
}

// Função para reiniciar o sorteio
function reiniciar() {
    amigos = [];
    document.getElementById('listaAmigos').textContent = '';
    document.getElementById('resultado').innerHTML = '';
}