//
// Récupération des éléments du DOM
const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const monBouton2 = document.getElementById('monBouton2');
const monInput3 = document.getElementById('monInput3');
const monInput4 = document.getElementById('monInput4');
const monBouton4 = document.getElementById('monBouton4');

// Ajout d'un écouteur d'événement sur le deuxième bouton
monBouton2.addEventListener('click', () => {
    fetch('/info').then(
        response => response.json()
    ).then(
        JsonResponse =>     {
            document.getElementById('reponse').innerHTML = JsonResponse.cle1;
        }    
    );   
}); 

// Ajout d'un écouteur d'événement sur le bouton
monBouton.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput.value })     
    }).then(response => response.text())
      .then(data => {
          alert(data);
      });
});

monBouton4.addEventListener('click', () => {
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputValue: monInput3.value, password: monInput4.value })     
    }).then(response => response.text())
      .then(data => {
          alert(data);
      });
});