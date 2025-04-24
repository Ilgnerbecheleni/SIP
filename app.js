const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');

const app = express();
const port = 443; // Porta padrão para HTTPS

// Certificados SSL (devem estar na pasta cert/)
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/ramal1000', (req, res) => {
  res.render('ramal1000');
});

app.get('/ramal2000', (req, res) => {
  res.render('ramal2000');
});

// Iniciar servidor HTTPS
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Servidor rodando em https://localhost`);
});
