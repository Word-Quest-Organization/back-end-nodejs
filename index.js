// 1. Importa o Express
const express = require('express');

// 2. Cria uma instância do Express
const app = express();

// 3. Define a porta onde o servidor vai rodar
// Usamos 3000 como padrão, mas pode ser qualquer porta livre.
const PORTA = 3000;

// 4. Define uma rota de teste (a rota raiz '/')
// req = Requisição (Request): O que o cliente (Flutter) envia.
// res = Resposta (Response): O que o servidor (Node) devolve.
app.get('/', (req, res) => {
  res.send('Meu servidor backend está funcionando!');
});

// 5. Inicia o servidor e o faz "ouvir" a porta definida
app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
  console.log(`Acesse http://localhost:${PORTA}`);
});