// app.js (Na raiz do projeto)

const express = require('express');
const app = express();

// CORREÇÃO: O caminho para suas rotas deve ser './src/routes/index'
// pois o app.js está na raiz, mas as rotas estão dentro de 'src'.
const rotasAPI = require('./src/routes/index');

// Middleware para o Express entender JSON
app.use(express.json());

// Define o prefixo /api para todas as rotas
app.use('/api', rotasAPI);

// Exporta o 'app' para que o index.js possa usá-lo
module.exports = app;