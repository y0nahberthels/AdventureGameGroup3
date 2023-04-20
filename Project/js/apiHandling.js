const form = document.getElementById('frm__login');
// sessionStorage technique found on https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
const sessionScore = sessionStorage.getItem('score');
const score = document.querySelector('#score');
const errormessage = document.querySelector('#errorMessage');
let playerName;
let userID;
let scoreID;

score.innerHTML = sessionScore;

// add form event listener and get data from user
form.addEventListener('submit', function (e) {
    // empty error message to prevent previous error messages when needed
    errormessage.innerHTML = "";
    // prevent default actions
    e.preventDefault();
    // get values from form
    playerName = document.getElementById('input__username').value;
    console.log('player: ' + playerName);
    console.log('score: ' + sessionScore);
    sendScore(playerName);
});

// we gebruiken de API van Kellian. Dit is een stuk makkelijker
async function sendScore(playerEmail){
    const params = new URLSearchParams();
    params.append('hostEmail', 'yonah.berthels@student.odisee.be');
    params.append('hostPassword', 'Naya2004');
    params.append('teamId','6904sawk54d3ptz');
    params.append('playerEmail', playerEmail);
    params.append('playerScore', sessionScore);
    const response = (await fetch('https://milquest.kevahu.net/addScore?'+ params.toString()));
    console.log(response);
    if(response.status === 200) {
        errormessage.innerHTML = 'Email adres is niet correct. Probeer opnieuw.';
    }
}