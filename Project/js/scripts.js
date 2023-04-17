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
const textField = document.querySelector('.txt__bottom');

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
    },
    desert: {
        name: 'desert',
        description: 'A hot desert, with sand dunes and cacti. You can hear the sound of the wind and the sand. You feel a hot breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
    },
    meadow: {
        name: 'meadow',
        description: 'A beautiful meadow, with flowers and grass. You can hear the sound of the wind, the birds and some animals. You feel a chill breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
    },
    swamp: {
        name: 'swamp',
        description: 'A dark swamp, with dense vegetation. You can hear the sound of birds and insects, but you can\'t see anything. You feel a chilling breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
    },
    ruins: {
        name: 'abandoned ruins',
        description: 'Abanonded ruins, totally overgrown with vines. You don\'t recognise any of the builidings, and wonder who built them... You can hear the sound of birds and insects, but you can\'t see anything. You feel a cold breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
    }
};

const playerClass = {};
const playerClasses = {
    warrior: {
        name: 'warrior',
        description: 'a strong veteran that has won many battles',
        // 140 skillpoints to divide among stats
        strength: '80',
        luck: '30',
        vitality:'30',
        weapons: ['sword', 'mace', 'great sword'],
        shield: ['round shield', 'square shield', 'great shield'],
    },
    Paladin: {
        name: 'paladin',
        description:'a wise hermit with great magical knowledge',
        // 140 skillpoints to divide among stats
        strength: '30',
        luck: '30',
        vitality: '80',
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
    if ((Math.round(((Math.random() * 100) + playerClass.player.luck)) / 2) >= 100 ) {
        critSucces = true;
    }
    //damage calculator
    if (critSucces == false) {let damage = Math.round(Math.random * playerClass.player.strength)}
    if (critSucces == true) {(Math.round(Math.random * playerClass.player.strength)) * 2}
}

function addText(text) {
    textField.innerHTML += text
}

function storyLine()
    // bij begin de innerhtml clearen
    textField.innerHTML = '';
    
    // playerklasse kiezen
    addText(testtekst);
    textField.innerHTML = startLocations[arLocations[Math.floor(Math.random() * arLocations.length)]].description;
}