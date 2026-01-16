const express = require('express');
const app = express();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '172.29.18.127', //localhost si votre node est sur la meme VM que votre Bdd
  user: 'accesNodeServerDemo',
  password: 'accesNodeServerDemo',
  database: 'Bddtest2'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL.');  
});

app.use(express.static('public'));
app.use(express.json());

 

app.get('/login', (req, res) => {
  res.send('<h1>Bienvenue sur la page de login  </h1>');
});

 

app.get('/info', (req, res) => {
  res.json({ cle1: 'Toto', cle2: 'Titi' });
});

 

app.post('/register', (req, res) => {
console.log('Données reçues pour l\'inscription');
console.log(req.body);
  res.json({ message: 'Inscription réussie !' });
});

 

app.listen(3000, () => {
  let monIp = require("ip").address();
  console.log(`Server running on http://${monIp}:3000`);
});
