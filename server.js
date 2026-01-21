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

app.get('/user', (req, res) => {
  connection.query('SELECT * FROM user', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

app.get('/Vote', (req, res) => {
  connection.query('SELECT * FROM Vote', (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des votes :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    res.json(results);
  });
});

app.post('/register', (req, res) => {

connection.query(
  'INSERT INTO user (login, password) VALUES (?, ?)',
  [req.body.inputValue, req.body.password],
  (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    console.log('Insertion réussie, ID utilisateur :', results.insertId);
    res.json({ message: 'Inscription réussie !', userId: results.insertId });
  }
);
});

app.post('/Vote', (req, res) => {

 connection.query(
  'INSERT INTO Vote (idUser) VALUES (?)', 
  [req.body.userId],
  (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données :', err);
      res.status(500).json({ message: 'Erreur serveur' });
      return;
    }
    console.log('Vote réussie :', results.insertId);
    res.json({ message: 'Vote pris en compte', idUser: results.insertId });
  }
);
});


app.listen(3000, () => {
  let monIp = require("ip").address();
  console.log(`Server running on http://${monIp}:3000`);
});

