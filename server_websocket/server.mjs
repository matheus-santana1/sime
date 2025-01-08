import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const connectedMessage = {
  conectado: 'conectado',
  prevNiveis: [22.5, 23.5, 24.5, 25.5, 26.5, 27.5, 28.5],
};

function gerarDados() {
  return {
    nivel: (Math.random() * 30).toFixed(2),
  };
}
let flag = 0;
let min = 0;
let max = 0;

wss.on('connection', function connection(ws) {
  console.log('Novo cliente conectado!');

  let intervalId = null; // Controlador do intervalo

  ws.on('message', function message(data) {
    try {
      const message = JSON.parse(data);
      console.log(message);

      if (message.acao === 'play') {
        // Inicia o envio de dados se não estiver ativo
        if (!intervalId) {
          intervalId = setInterval(() => {
            const dados = gerarDados();
            if (flag == 0) {
              min = dados.nivel;
            }
            ws.send(JSON.stringify(dados));
            flag++;
            if (flag == 10) {
              max = dados.nivel;
              ws.send(
                JSON.stringify({
                  variacao: min - max,
                })
              );
              flag = 0;
            }
          }, 1000); // Envia dados a cada 1 segundo
          console.log('Envio de dados iniciado.');
        }
      } else if (message.acao === 'pause') {
        // Para o envio de dados
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
          console.log('Envio de dados pausado.');
        }
      }
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
    }
  });

  // Envia mensagem inicial ao cliente
  setTimeout(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify(connectedMessage));
      console.log('Message sent after 5 seconds!');
    } else {
      console.error('WebSocket is not open. Could not send the message.');
    }
  }, 1);

  // Limpa o intervalo quando o cliente desconecta
  ws.on('close', () => {
    console.log('Cliente desconectado. Intervalo limpo.');
    if (intervalId) {
      clearInterval(intervalId);
    }
  });

  ws.on('error', console.error);
});
