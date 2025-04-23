// app.js
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Carrega os certificados SSL
const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

// Configura EJS e arquivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
  res.render('index');
});

// Inicia servidor HTTPS na porta 443
https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS ativo em https://webrtc.jobsconnect.com.br');
});
