strong = document.getElementsByTagName("strong");

// for (i = 0; i <= strong.length; i++) {
//     strong[i].innerHTML = "LEGO";
// }

function jogar() {
    palavra = document.getElementById("palavra").value;
    console.log(palavra);

    for (i = 0; i <= strong.length; i++) {
        strong[i].innerHTML = palavra;

    }
}

// Som de clique no botão "Jogar"
// Som de clique no botão "Jogar"
function jogar() {
    const somClique = new Audio('img/Minecraft - Buttonplate Click (Sound Eff.mp3');
    somClique.play();

    const palavra = document.getElementById('palavra').value.trim();
    const caixa = document.getElementById('caixaPalavras');
    const textos = caixa.getElementsByTagName('p');

    for (let p of textos) {
        p.innerHTML = p.innerHTML.replace(/<strong>.*?<\/strong>/g, `<strong>${palavra}</strong>`);
    }
}

// Delay entre sons
let podeTocarSom = true;

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('palavra');

    input.addEventListener('input', () => {
        if (podeTocarSom) {
            const somBloco = new Audio('img/grass-break-made-with-Voicemod.mp3');
            somBloco.volume = 0.3;
            somBloco.play();

            podeTocarSom = false;
            setTimeout(() => {
                podeTocarSom = true;
            }, 100); // 0.5 segundos
        }
    });
});

