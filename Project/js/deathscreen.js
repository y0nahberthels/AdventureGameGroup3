const deathMessageDisplay = document.querySelector('#deathMessageDisplay');

// sessionscore technique found on https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
deathMessageDisplay.innerHTML = sessionStorage.getItem('deathMessage');
console.log(sessionStorage.getItem('deathMessage'));