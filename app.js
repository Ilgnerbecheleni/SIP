const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// SSL Certificados
const options = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
};

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => res.redirect('/6000'));

// Rotas por ramal
app.get('/6000', (req, res) => {
  res.render('layout', {
    title: 'Recepção (6000)',
    user: '6000',
    pass: 'senha6000',
    dests: ['6001', '6002', '6003', '6004']
  });
});

app.get('/6001', (req, res) => {
  res.render('layout', {
    title: 'Suíte 6001',
    user: '6001',
    pass: 'senha6001',
    dests: ['6000']
  });
});

app.get('/6002', (req, res) => {
  res.render('layout', {
    title: 'Suíte 6002',
    user: '6002',
    pass: 'senha6002',
    dests: ['6000']
  });
});

app.get('/6003', (req, res) => {
  res.render('layout', {
    title: 'Lavanderia (6003)',
    user: '6003',
    pass: 'senha6003',
    dests: ['6000']
  });
});

app.get('/6004', (req, res) => {
  res.render('layout', {
    title: 'Restaurante (6004)',
    user: '6004',
    pass: 'senha6004',
    dests: ['6000']
  });
});

// Servidor HTTPS
https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS ativo em https://webrtc.jobsconnect.com.br');
});
