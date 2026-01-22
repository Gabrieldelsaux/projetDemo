//
// Récupération des éléments du DOM
const monInput = document.getElementById('monInput');
const monBouton = document.getElementById('monBouton');
const monBouton2 = document.getElementById('monBouton2');
const monInput3 = document.getElementById('monInput3');
const monInput4 = document.getElementById('monInput4');
const monBouton4 = document.getElementById('monBouton4');
const monBouton5 = document.getElementById('monBouton5');
const monInput5 = document.getElementById('monInput5');
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

window.onload = () => {
    fetch('/user')
    .then(response => response.json())
    .then(users => {
        const usersList = document.getElementById('usersList');
        users.forEach(user => {
            //création d'un input select option avec id en value et login en texte  
            const option = document.createElement('option');
            option.value = user.id;
            option.text = user.login;
            usersList.appendChild(option);  
            
        });
    });
}

const userSelectedButton = document.getElementById('userSelectedButton');

userSelectedButton.addEventListener('click', () => {
    const userList = document.getElementById('usersList');
    const selectedUserId = userList.value;
    fetch('/Vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: selectedUserId })     
    }).then(response => response.text())
      .then(data => {
          alert(data);
      });
    alert('Utilisateur sélectionné ID : ' + selectedUserId);
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

monBouton5.addEventListener('click', () => {
    const userList = document.getElementById('usersList');
    const selectedUserId = userList.value;

    fetch('/VoteCount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: selectedUserId })
    })
    .then(response => response.json()) 
    .then(data => {
        monInput5.innerHTML = "Nombre de votes : " + data.voteCount;
    });
});
