const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBr = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarImg = document.querySelector("#start-pause img");

const titulo = document.querySelector(".app__title");
const banner = document.querySelector(".app__image");

const musicaFocoInput = document.querySelector("#alternar-musica");

const musica = new Audio("/sons/luna-rise-part-one.mp3");
const somIniciar = new Audio("/sons/play.wav");
const somPausar = new Audio("/sons/pause.mp3");
const somZerar = new Audio("/sons/beep.mp3");

const tempoNaTela = document.querySelector("#timer");

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
    musica.loop = true;
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);

  switch (contexto) {
    case "foco":
      titulo.innerHTML =
        'Otimize sua produtividade,<br /><strong class="app__title-strong">mergulhe no que importa.</strong>';
      break;
    case "descanso-curto":
      titulo.innerHTML =
        'Que tal dar uma respirada?<br /><strong class="app__title-strong"> Faça uma pausa curta!</strong>';
      break;
    case "descanso-longo":
      titulo.innerHTML =
        'Hora de voltar à superfície.<br /><strong class="app__title-strong">Faça uma pausa longa.</strong>';
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    somZerar.play();
    console.log("Contagem regressiva finalizada.");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo();
};

startPauseBr.addEventListener("click", () => {
  iniciarOuPausar();
});

function iniciarOuPausar() {
  if (intervaloId) {
    somPausar.play();
    zerar();
    return;
  }
  somIniciar.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarImg.setAttribute("src", "/imagens/pause.png");
  iniciarOuPausarBt.textContent = "Pausar";
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
  iniciarOuPausarImg.setAttribute("src", "/imagens/play_arrow.png");
  iniciarOuPausarBt.textContent = "Começar";
}

function mostrarTempo() {
  const tempo = tempoDecorridoEmSegundos;
  tempoNaTela.innerHTML = `${tempo}`;
}

mostrarTempo();
