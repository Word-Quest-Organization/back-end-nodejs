// index.js (Na raiz do projeto)

require("dotenv").config();

const app = require("./app");

const PORTA = process.env.PORTA || 3000;

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
});
