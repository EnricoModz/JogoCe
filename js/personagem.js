window.addEventListener("DOMContentLoaded", () => {
  const selecionado = localStorage.getItem("personagemConfirmado");
  if (selecionado) {
    const personagens = document.querySelectorAll('.character');
    personagens.forEach(char => {
      const nome = char.getAttribute("data-name");
      if (nome === selecionado) {
        char.classList.add("selected");
        document.getElementById("selected-image").src = char.querySelector("img").src;
        document.getElementById("selected-image").style.display = "block";
        document.getElementById("selected-name").textContent = nome;
      }
    });
  }
});


function selectCharacter(element) {
  // Remove seleção anterior
  const characters = document.querySelectorAll('.character');
  characters.forEach(char => char.classList.remove('selected'));

  // Marca como selecionado
  element.classList.add('selected');

  // Dados do personagem
  const nome = element.getAttribute('data-name');
  const imagem = element.querySelector('img').getAttribute('src');
  const som = element.getAttribute('data-sound').toLowerCase();

  // Descrições
  const descricoes = {
    "Blaze": `* Vida: 40 HP\n\n* Ataque: 12 (fogo)\n\n* Defesa: 5\n\n* Velocidade: Média\n\n* Habilidade Especial: Disparo de bolas de fogo à distância. Imune ao fogo.`,
    "Creeper": `* Vida: 20 HP\n\n* Ataque: 0 (corpo a corpo), 40 (explosão)\n\n* Defesa: 1\n\n* Velocidade: Média\n\n* Habilidade Especial: Explode ao se aproximar. A explosão causa dano em área.`,
    "Enderman": `* Vida: 40 HP\n\n* Ataque: 14\n\n* Defesa: 4\n\n* Velocidade: Alta (teletransporte)\n\n* Habilidade Especial: Teletransporta-se para esquivar e se aproximar. Imune a projéteis.`,
    "Esqueleto": `* Vida: 20 HP\n\n* Ataque: 8 (arco)\n\n* Defesa: 2\n\n* Velocidade: Média\n\n* Habilidade Especial: Ataques à distância com precisão.`,
    "Piglin": `* Vida: 24 HP\n\n* Ataque: 8 (espada ou machado)\n\n* Defesa: 3\n\n* Velocidade: Média\n\n* Habilidade Especial: Agressivo com quem não estiver usando ouro.`,
    "Warden": `* Vida: 100 HP\n\n* Ataque: 30\n\n* Defesa: 10\n\n* Velocidade: Lenta\n\n* Habilidade Especial: Detecta vibrações e causa medo. Imune a cegueira. Extremamente forte.`,
    "Wither Skeleton": `* Vida: 150 HP\n\n* Ataque: 20 (explosão + cabeças)\n\n* Defesa: 8\n\n* Velocidade: Alta (voa)\n\n* Habilidade Especial: Ataca com projéteis explosivos e se regenera.`,
    "Zumbi Pigman": `* Vida: 20 HP\n\n* Ataque: 7\n\n* Defesa: 2\n\n* Velocidade: Média\n\n* Habilidade Especial: Em bando, todos atacam juntos quando um é agredido.`,
    "Zumbi": `* Vida: 20 HP\n\n* Ataque: 6\n\n* Defesa: 2\n\n* Velocidade: Lenta\n\n* Habilidade Especial: Pode infectar villagers. Queima ao sol.`,
    "Galinha": `* Vida: 4 HP\n\n* Ataque: 0\n\n* Defesa: 0\n\n* Velocidade: Alta\n\n* Habilidade Especial: Flutua ao cair, bota ovos.`,
    "Ovelha": `* Vida: 8 HP\n\n* Ataque: 0\n\n* Defesa: 1\n\n* Velocidade: Média\n\n* Habilidade Especial: Pode ser tosada para obter lã.`,
    "Porco": `* Vida: 10 HP\n\n* Ataque: 0\n\n* Defesa: 1\n\n* Velocidade: Média\n\n* Habilidade Especial: Pode ser montado com sela.`,
    "Vaca": `* Vida: 10 HP\n\n* Ataque: 0\n\n* Defesa: 2\n\n* Velocidade: Lenta\n\n* Habilidade Especial: Pode ser ordenhada. Gota de couro.`,
    "Villager": `* Vida: 20 HP\n\n* Ataque: 0 (defende-se se zombificado)\n\n* Defesa: 1\n\n* Velocidade: Média\n\n* Habilidade Especial: Pode negociar com o jogador. Tem profissões.`,
    "Steve": `* Vida: 20 HP\n\n* Ataque: Variável (por arma equipada)\n\n* Defesa: Variável (por armadura)\n\n* Velocidade: Média\n\n* Habilidade Especial: Constrói, minera, usa qualquer item, aprende habilidades.`
  };

  const descricao = descricoes[nome] || "Informações não disponíveis.";

  // Salva no localStorage para a tela de detalhes
  const dados = {
    nome: nome,
    imagem: imagem,
    descricao: descricao,
    som: som
  };

  localStorage.setItem('personagemSelecionado', JSON.stringify(dados));

  // Redireciona para a tela de detalhes
  window.location.href = 'detalhes.html';
}
