var casas = [9, 9, 9, 9, 9, 9, 9, 9, 9];
var vez = 1;
var contaclique = 0;
var iPontosX = 0;
var iPontosO = 0;
var iPontosV = 0;
var sResposta = "";

let jogador1 = {
  nome: "Steve",
  imagem: "img/steve.webp"
};

let jogador2 = {
  nome: "Creeper",
  imagem: "img/creeper.png"
};

function verifica(casa){
    if(casas[casa] == 9){
        casas[casa] = vez;
        if(vez == 1){
            document.getElementById("img"+casa).src = jogador1.imagem;
        }else{
            document.getElementById("img"+casa).src = jogador2.imagem;
        }
        vez = -vez;
        contaclique++;
        confere();
    }
}

function confere(){
    var i;
    var iGanhou = false;
    var iAcabou = true;

    for(i=0;i<casas.length;i++){
        if(casas[i]==9){
            iAcabou = false;
        }
    }

    if(contaclique == 9) iAcabou = true;

    var Soma = [];
    Soma[0]=casas[0]+casas[1]+casas[2];
    Soma[1]=casas[3]+casas[4]+casas[5];
    Soma[2]=casas[6]+casas[7]+casas[8];
    Soma[3]=casas[0]+casas[3]+casas[6];
    Soma[4]=casas[1]+casas[4]+casas[7];
    Soma[5]=casas[2]+casas[5]+casas[8];
    Soma[6]=casas[0]+casas[4]+casas[8];
    Soma[7]=casas[2]+casas[4]+casas[6];

    for(i=0;i<Soma.length;i++){
        if(Soma[i]==3){
            iGanhou=true;
            sResposta=jogador1.nome+" GANHOU!!!";
            iPontosX++;
            document.getElementById("bola").innerHTML="PONTOS "+jogador1.nome+": "+iPontosX;
            break;
        }else if(Soma[i]==-3){
            iGanhou=true;
            sResposta=jogador2.nome+" GANHOU!!!";
            iPontosO++;
            document.getElementById("xis").innerHTML="PONTOS "+jogador2.nome+": "+iPontosO;
            break;
        }
    }

    if(iGanhou==false && iAcabou==true){
        sResposta="Deu VELHA!!!";
        iPontosV++;
        document.getElementById("velha").innerHTML="VELHA...: "+iPontosV;
    }

    if(iGanhou || iAcabou){
        for(i=0;i<casas.length;i++){
            document.getElementById("casa"+i).onclick = null;
        }
        document.getElementById("resposta").innerHTML = sResposta;
        document.getElementById("resposta").style.color = "#ffc400";
        document.getElementById("resposta").style.fontSize = "xx-large";
    }
}

function recomeca(){
    const salvo1 = localStorage.getItem("personagemJogador1");
    const salvo2 = localStorage.getItem("personagemJogador2");

    if (salvo1) jogador1 = JSON.parse(salvo1);
    if (salvo2) jogador2 = JSON.parse(salvo2);

    for(let i=0; i<casas.length; i++){
        document.getElementById("img"+i).ondragstart = function() { return false; };
        document.getElementById("casa"+i).onclick = function(index) {
            return function() {
                verifica(index);
            }
        }(i);
        document.getElementById("img"+i).src = "./img/logo.jfif";
        casas[i] = 9;
    }

    document.getElementById("resposta").innerHTML = "RESULTADO:";
    document.getElementById("resposta").style.color = "#ffff00";
    document.getElementById("resposta").style.fontSize = "large";
    contaclique = 0;
    vez = 1;

    document.getElementById("xis").innerHTML = `PONTOS ${jogador2.nome}: ${iPontosO}`;
    document.getElementById("bola").innerHTML = `PONTOS ${jogador1.nome}: ${iPontosX}`;
}


function trocarPersonagens() {
  localStorage.removeItem("personagemJogador1");
  localStorage.removeItem("personagemJogador2");
  window.location.href = "pesonagem.html";
}
