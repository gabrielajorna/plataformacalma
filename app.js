const etapas = {
  inicio: {
    imagem: "inicio-crise-convulsiva.gif",
    situacao: "Início da crise convulsiva.",
    audio: ["audio/mulher_cotidiano.m4a", "audio/inicio_crise.m4a", "audio/queda.m4a"],
    acoes: [
      { texto: "Prestar os primeiros socorros", direciona: "pessoaCai", audio: "audio/take_1.m4a" },
      { texto: "Ligar para o SAMU (192)", direciona: "pessoaCai", audio: "audio/take_1.m4a" },
    ],
  },
  pessoaCai: {
    imagem: "pessoa-cai-chao.gif",
    situacao: "A pessoa bate a cabeça.",
    audio: "audio/ligar_samu.m4a",
    acoes: [
      { texto: "Seguir instruções do SAMU", direciona: "pessoaDebate", audio: "audio/pessoa-cai.m4a" },
    ],
  },
  pessoaDebate: {
    imagem: "mulher_amparada.png",
    situacao: "A pessoa começa a se debater.",
    audio: "audio/primeiros_socorros.m4a",
    acoes: [
      { texto: "C - Coloque a pessoa de lado, com a cabeça elevada para evitar sufocamento com saliva.", direciona: "pessoaContinua", audio: "audio/pessoa-debate.m4a" },
    ],
  },
  pessoaContinua: {
    imagem: "cabeca_apoiada.png",
    situacao: "A pessoa continua se debatendo.",
    audio: "audio/pessoa-continua.m4a",
    acoes: [
      { texto: "A - Apoie a cabeça da pessoa com algo macio (blusa, mochila, jaleco).", direciona: "pessoaSaliva", audio: "audio/pessoa-continua.m4a" },
    ],
  },
  pessoaSaliva: {
    imagem: "oculos.png",
    situacao: "A pessoa saliva e há riscos associados.",
    audio: "audio/L-calma.m4a",
    acoes: [
      { texto: "L - Localize e afaste objetos perigosos (retire óculos, afrouxe roupas apertadas).", direciona: "monitorarTempo", audio: "audio/pessoa-saliva.m4a" },
    ],
  },
  monitorarTempo: {
    imagem: "relogio.png",
    situacao: "Monitorando o tempo da crise.",
    audio: "audio/m-calma.m4a",
    acoes: [
      { texto: "M - Monitore a duração da crise e ligue para o SAMU se durar mais de 5 minutos.", direciona: "fimCrise", audio: "audio/monitorar-tempo.m4a" },
    ],
  },
  fimCrise: {
    imagem: "mulher_recuperada.png", /* Corrigido extensão para PNG */
    situacao: "Convulsão termina e a pessoa recupera a consciência.",
    audio: "audio/a2-calma.m4a",
    acoes: [
      { texto: "A - Acompanhe a pessoa até que ela esteja em segurança. Ligue para o SAMU se necessário.", direciona: "inicio", audio: "audio/fim-crise.m4a" },
    ],
  },
};

let audioPlayer = null;

function mostrar(nome) {
  const etapa = etapas[nome];
  let botoes = "";

  // Gerar botões com base nas ações da etapa atual
  etapa.acoes.forEach(acao => {
    botoes += `<button onclick="mostrar('${acao.direciona}'); playAudio('${acao.audio}')">${acao.texto}</button>`;
  });

  // Atualizar a narrativa
  document.getElementById("narrativa").innerHTML = `
    <img src="${etapa.imagem}" alt="" />
    <p>${etapa.situacao}</p>
    <div>${botoes}</div>
  `;

  // Reproduzir o áudio
  if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
  }
  const audioSrc = Array.isArray(etapa.audio) ? etapa.audio[Math.floor(Math.random() * etapa.audio.length)] : etapa.audio;
  audioPlayer = new Audio(audioSrc);
  audioPlayer.play().catch(error => console.error("Erro ao reproduzir áudio:", error));
}

function playAudio(audioSrc) {
  const audioAction = new Audio(audioSrc);
  audioAction.play().catch(error => console.error("Erro ao reproduzir áudio da ação:", error));
}

// Exibir etapa inicial
mostrar("inicio");
