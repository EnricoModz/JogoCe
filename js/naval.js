const tamanho = 5;
const totalNavios = 5;
let navios = [];
let naviosRestantes = totalNavios;
let vidas = 6;

let jogador1 = {
  nome: "Steve",
  imagem: "img/steve.webp"
};

let jogador2 = {
  nome: "Creeper",
  imagem: "img/creeper.png"
};

const salvo1 = localStorage.getItem("personagemJogador1");
const salvo2 = localStorage.getItem("personagemJogador2");

if (salvo1) jogador1 = JSON.parse(salvo1);
if (salvo2) jogador2 = JSON.parse(salvo2);

const vidasEl = document.getElementById("vidas");
const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const naviosEl = document.getElementById("navios");
const barra = document.getElementById("barra");

let posicionando = true;
let naviosSelecionados = 0;

const mensagensAcerto = [
  "Acertou uma parabens! 🙌",
  "Esse deu critico! 👌",
  "Creeper acertado! 👍",
];

const mensagensErro = [
  "Acerto... o Steve kkk 🤣",
  "Não saber nem fazer combo! 🤦‍♂️",
  "Vesgo! 😂",
  "Não foi dessa vez! seu noob 🤷"
];

function criarTabuleiro() {
  tabuleiro.innerHTML = "";
  for (let linha = 0; linha < tamanho; linha++) {
    for (let col = 0; col < tamanho; col++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");
      celula.dataset.pos = `${linha}-${col}`;
      celula.addEventListener("click", clicarCelula);
      tabuleiro.appendChild(celula);
    }
  }
}

function clicarCelula(e) {
  const celula = e.target;
  const pos = celula.dataset.pos;

  if (celula.classList.contains("acerto") || celula.classList.contains("erro")) return;

  if (posicionando) {
    if (navios.includes(pos)) return;

    navios.push(pos);
    naviosSelecionados++;
    celula.classList.add("posicionado");

    if (naviosSelecionados === totalNavios) {
      posicionando = false;
      naviosRestantes = totalNavios;
      naviosEl.textContent = naviosRestantes;
      barra.style.width = "100%";
      mensagem.textContent = "🧱 Início da batalha! Tente encontrar os navios!";

      // Recriar o tabuleiro para limpar as marcas visuais
      setTimeout(() => criarTabuleiro(), 500);
    } else {
      mensagem.textContent = `🚢 Selecione ${totalNavios - naviosSelecionados} navios.`;
    }
    return;
  }

  if (navios.includes(pos)) {
    celula.classList.add("acerto");
    const img = document.createElement("img");
    img.src = jogador2.imagem;
    img.alt = jogador2.nome;
    img.classList.add("icone");
    celula.appendChild(img);
    mensagem.textContent = mensagensAcerto[Math.floor(Math.random() * mensagensAcerto.length)];
    naviosRestantes--;
    naviosEl.textContent = naviosRestantes;
    barra.style.width = `${(naviosRestantes / totalNavios) * 100}%`;

    vidas++;
    vidasEl.textContent = vidas;

    if (naviosRestantes === 0) {
      mensagem.textContent = `🎉 GG EZ Você destruiu todos os ${jogador2.nome}s!`;
      desativarTabuleiro();
      setTimeout(() => {
        mensagem.textContent = "🔁 Reiniciando o jogo...";
      }, 2000);
      setTimeout(() => {
        iniciarJogo();
      }, 4000);
    }
  } else {
    celula.classList.add("erro");
    const img = document.createElement("img");
    img.src = jogador1.imagem;
    img.alt = jogador1.nome;
    img.classList.add("icone");
    celula.appendChild(img);

    mensagem.textContent = mensagensErro[Math.floor(Math.random() * mensagensErro.length)];

    vidas--;
    vidasEl.textContent = vidas;

    const dicaNavio = navios.find(n => {
      const cel = document.querySelector(`[data-pos='${n}']`);
      return !cel.classList.contains("acerto");
    });

    if (dicaNavio) {
      const [linhaN, colN] = dicaNavio.split("-").map(Number);
      const [linhaC, colC] = celula.dataset.pos.split("-").map(Number);
      const dist = Math.abs(linhaN - linhaC) + Math.abs(colN - colC);

      if (dist === 1) {
        mensagem.textContent += `\n👉 Dica: ${jogador2.nome} está bem ao lado!`;
      } else if (dist <= 2) {
        mensagem.textContent += `\n🔍 Dica: Tem um ${jogador2.nome} a poucos blocos de distância.`;
      } else if (linhaN === linhaC) {
        mensagem.textContent += `\n📏 Dica: ${jogador2.nome} está no mesmo Y.`;
      } else if (colN === colC) {
        mensagem.textContent += `\n📐 Dica: ${jogador2.nome} está no mesmo X.`;
      } else {
        mensagem.textContent += `\n🧭 Dica: ${jogador2.nome} está a muitos blocos... tente explorar outra área.`;
      }
    }

    if (vidas === 0 && naviosRestantes > 0) {
      mensagem.textContent = `💀 Game Over! Sua espada quebrou! ${jogador2.nome}s dominaram.`;
      mostrarNavios();
      desativarTabuleiro();
      setTimeout(() => {
        mensagem.textContent = "🔁 Reiniciando o jogo...";
      }, 2000);
      setTimeout(() => {
        iniciarJogo();
      }, 4000);
    }
  }
}

function iniciarJogo() {
  navios = [];
  naviosSelecionados = 0;
  posicionando = true;
  vidas = 6;
  mensagem.textContent = `Jogador 2: Selecione ${totalNavios} posições para os Mobs.`;
  vidasEl.textContent = vidas;
  naviosEl.textContent = totalNavios;
  barra.style.width = "100%";
  criarTabuleiro();
}

function desativarTabuleiro() {
  const celulas = document.querySelectorAll(".celula");
  celulas.forEach(cel => {
    cel.replaceWith(cel.cloneNode(true));
  });
}

function mostrarNavios() {
  navios.forEach(pos => {
    const celula = document.querySelector(`[data-pos='${pos}']`);
    if (!celula.classList.contains("acerto")) {
      celula.classList.add("acerto");
      const img = document.createElement("img");
      img.src = jogador2.imagem;
      img.alt = jogador2.nome;
      img.classList.add("icone");
      celula.appendChild(img);
    }
  });
}

function trocarPersonagens() {
  localStorage.removeItem("personagemJogador1");
  localStorage.removeItem("personagemJogador2");
  window.location.href = "pesonagem.html";
}

iniciarJogo();