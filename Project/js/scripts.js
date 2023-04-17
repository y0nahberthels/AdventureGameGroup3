'use strict';

// define arrays with needed variables
const urbanDestinations = ['Medieval town', 'Steampunk city', 'Elven Land' ,'Dwarven village'];
const homeLocations = [''];
const npcUrban = [];
const npcMine = [];
const savedProperties = [];
const item = ['USB-stick', 'dish', 'metal stick', 'pencil', 'slipper', 'ice cube', 'iPod nano', 'brocolli', 'WIFI router', 'Raspberri Pi', 'eye liner', 'eraser', 'rubber duck', 'PS2', 'truck', 'scooter', 'rock', 'button', 'cork', 'chalk', 'sandal', 'radio' ]; 
const exchangeItem = ['diamond', 'unobtanium', 'moon dust', 'titanium', 'gold', 'plutonium', 'antimatter', 'speed of light', 'Californium', 'Tritium'];
const snack = ['kit kat', 'Bifi', 'chips', 'm&m', 'carrots', 'bell pepper', 'peanuts', 'cucumber', 'cheetohs', 'snickers'];
const testshow = document.querySelector('#testshow');
const textField = document.querySelector('#txt__bottom');
const playerInput = document.querySelector('#playerInput')

const currentLocation = document.querySelector('#currentLocation');
const healthpool = document.querySelector('#health');
const attack_points = document.querySelector('#attack_points');
const defense_points = document.querySelector('#defense_points');
const luck = document.querySelector('#luck');
const btnSubmit = document.querySelector('#btnSubmit');
const characterImage = document.querySelector('#character_image')
const imgEnvironnement = document.querySelector('#imgEnvironnement')



let loc;
const beasts = {
    wolf: {
        name: 'wolf',
        description: 'A giant wolf, with sharp teeth and claws. It looks hungry.'
    },
    troll: {
        name: 'troll',
        description: 'A menacing troll with a giant club, stained with blood. Will I be its next victim?'
    },
    dragon: {
        name: 'dragon',
        description: 'A huge red dragon, with a fiery breath. It\'s surrounded by bones of its victims.'
    },
    crocodile: {
        name: 'crocodile',
        description: 'A huge crocodile, so big I can barely believe my eyes. It can, without a doubt, swallow me whole.'
    }
};

const arLocations = ['forest', 'desert', 'meadow', 'swamp', 'ruins'];
const startLocations = {
    forest: {
        name: 'forest',
        description: 'A dark forest, with dense vegetation. You can hear the sound of birds and insects, but you can\'t see anything. You feel a cold breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Forest.jpg'
    },
    desert: {
        name: 'desert',
        description: 'A hot desert, with sand dunes and cacti. You can hear the sound of the wind and the sand. You feel a hot breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Desert.jpg'
    },
    meadow: {
        name: 'meadow',
        description: 'A beautiful meadow, with flowers and grass. You can hear the sound of the wind, the birds and some animals. You feel a chill breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Meadow.jpeg'
    },
    swamp: {
        name: 'swamp',
        description: 'A dark swamp, with dense vegetation. You can hear the sound of birds and insects, but you can\'t see anything. You feel a chilling breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Swamp.jpg'
    },
    ruins: {
        name: 'abandoned ruins',
        description: 'Abanonded ruins, totally overgrown with vines. You don\'t recognise any of the builidings, and wonder who built them... You can hear the sound of birds and insects, but you can\'t see anything. You feel a cold breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Ruins.jpg'
    }
};

let player = null;
const playerClasses = {
    warrior: {
        name: 'warrior',
        description: 'a strong veteran that has won many battles',
        // 140 skillpoints to divide among stats
        strength: '80',
        luck: '30',
        vitality:'30',
        health: 100,
        sprite: 'img/Warrior.png',
        weapons: ['sword', 'mace', 'great sword'],
        shield: ['round shield', 'square shield', 'great shield'],
    },
    paladin: {
        name: 'paladin',
        description:'a wise hermit with great magical knowledge',
        // 140 skillpoints to divide among stats
        strength: '30',
        luck: '30',
        vitality: '80',
        health: 150,
        sprite: 'img/Paladin.png',
        weapons: ['crystal staff', 'old wizards cane', 'magical sword'],
        shield: ['round shield', 'square shield', 'mystic shield'],
    },
    irishman: {
        name: 'irishman',
        description: 'a lucky irishman blessed by Saint Patrick',
        // 140 skillpoints to divide among stats
        strength: '30',
        luck: '80',
        vitality:'30',
        health: 100,
        sprite: 'img/Irishman.png',
        weapons: ['sword', 'mace', 'spear'],
        shield: ['round shield', 'square shield', 'lucky clover shield'],
    },
    adventurer: {
        name: 'adventurer',
        description: 'a daring, well rounded adventurer',
        // 140 skillpoints to divide among stats
        strength: '46',
        luck: '47',
        vitality:'47',
        health: 120,
        sprite: 'img/Adventurer.png',
        weapons: ['sword', 'mace', 'spear'],
        shield: ['round shield', 'square shield', 'adventurers shield'],
    }
};

function randomChance() {
    const succes = false;
    const chanceInt = ((Math.round(Math.random * 100) + player.luck) / 2);
    if (chanceInt >= 100){succes = true}
    if (chanceInt < 100){succes = false}
    return succes;
}

function outgoingDamage() {
    //critical hit calculator
    const critSucces = false;
    if ((Math.round(((Math.random() * 100) + player.luck)) / 2) >= 100 ) {
        critSucces = true;
    }
    //damage calculator
    if (critSucces == false) {let damage = Math.round(Math.random * player.strength)}
    if (critSucces == true) {(Math.round(Math.random * player.strength)) * 2}
}

// danger is de max damage dat je kan krijgen, damage = 0 tot danger (niet tot en met)
function incomingDamage(danger) {
    let damage = Math.round(Math.random() * danger);
    player.health -= damage;
    updateStats(player);
}

function addText(text) {
    textField.innerHTML += `${text} \n`;
}

storyLine();
function storyLine() {
    // choose player class
    chooseClass();
    changeLocation(startLocations.forest.image);
}

function calculateLocation(){
    loc = startLocations[arLocations[Math.floor(Math.random() * arLocations.length)]]
    return loc;
}

function chooseClass() {
    addText("You wake up and remember who you are (Warrior, Paladin, Irishman or Adventurer)" + "\n" + 
    `warrior: ${playerClasses.warrior.description}|
    paladin: ${playerClasses.paladin.description}|
    adventurer: ${playerClasses.adventurer.description}|
    irishman: ${playerClasses.irishman.description}
    `);
    btnSubmit.addEventListener('click', function(e) {
        e.preventDefault();
        player = playerClasses[playerInput.value.toLowerCase()];  
        playerInput.value = '';
        updateStats(player);
        displayLocation(calculateLocation());
        characterImage.src = player.sprite;
    })
}

function displayLocation(loc) {
    console.log(loc);
     // calculate location and display it
     calculateLocation();
    addText(loc.description);
    currentLocation.innerHTML = loc.name;
    imgEnvironnement.src = loc.image;
}

function updateStats(player) {
    healthpool.innerHTML = ''
    if (player.health > 0) {
        healthpool.innerHTML = 'Health: ' + player.health;
    }
    if (player.health < 0) {
        console.log('death')
        healthpool.innerHTML = 'dead';
    }
    // empty stats
    attack_points.innerHTML = '';
    defense_points.innerHTML = '';
    luck.innerHTML = '';
    // fill in stats
    attack_points.innerHTML = 'Attack: ' + player.strength;
    defense_points.innerHTML = 'Defense: ' + player.vitality;
    luck.innerHTML = 'Luck: ' + player.luck;
}

function changeLocation(imageLink) {

}

/*
function firstChoice() {
    addText('I have two choices. At my left, there is a cliff. Maybe I can jump down and get out of here. At my right there is a pathway leading to the horizon. I can\'t see where it leads, but it looks like a good idea to follow it. \n');
    choice = playerInput.value.toLowerCase();

    if (choice.includes('left')) {
        incomingDamage(1000);
        addText($`I jump down the cliff. I land on a rock and die.
        `);
    }
    else if (choice.includes('right')) {
        addText('I follow the pathway. It leads to a forest. \n');
        //changeLocation =>
        // secondChoice();
    }
}
*/