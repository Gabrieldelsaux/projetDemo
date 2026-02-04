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
        JsonResponse => {
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
    voteRN();

};

const userSelectedButton = document.getElementById('userSelectedButton');

userSelectedButton.addEventListener('click', () => {
    const userList = document.getElementById('usersList');
    const selectedUserId = userList.value;
    fetch('/Vote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idUser: selectedUserId, idElecteur: localStorage.getItem('userId') })
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

function voteRN() {
    const usersList = document.getElementById('usersList');
    const selectedUserId = usersList.value;
    fetch('/VoteCount', {
    })
        .then(response => response.json())
        .then(data => {
            const result = document.getElementById('resultat');
            data.forEach(vote => {
                const tr = document.createElement("tr");
                result.appendChild(tr);
                const td = document.createElement("td");
                td.innerText = vote.login;
                tr.appendChild(td);
                const td1 = document.createElement("td");
                td1.innerText = vote.voteCount;
                tr.appendChild(td1);



            });
        })
}

const loginButton = document.getElementById('login');
loginButton.addEventListener('click', () => {
    const loginInput = document.getElementById('loginInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    fetch('/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: loginInput, password: passwordInput })
    }).then(response => response.json())
        .then(data => {
            alert(data.message);
            alert('ID utilisateur : ' + data.user.id);
            localStorage.setItem('userId', data.user.id);
        });
});

