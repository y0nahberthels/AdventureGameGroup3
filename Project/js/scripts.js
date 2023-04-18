'use strict';

// define arrays with needed variables
const homeLocations = [''];
const npcUrban = [];
const npcMine = [];
const savedProperties = [];
const item = ['USB-stick', 'dish', 'metal stick', 'pencil', 'slipper', 'ice cube', 'iPod nano', 'brocolli', 'WIFI router', 'Raspberri Pi', 'eye liner', 'eraser', 'rubber duck', 'PS2', 'truck', 'scooter', 'rock', 'button', 'cork', 'chalk', 'sandal', 'radio' ]; 
const exchangeItem = ['diamond', 'unobtanium', 'moon dust', 'titanium', 'gold', 'plutonium', 'antimatter', 'speed of light', 'Californium', 'Tritium'];
const snack = ['kit kat', 'Bifi', 'chips', 'm&m', 'carrots', 'bell pepper', 'peanuts', 'cucumber', 'cheetohs', 'snickers'];
const testshow = document.querySelector('#testshow');
const textField = document.querySelector('#txt__bottom');
const playerInput = document.querySelector('#playerInput');

const currentLocation = document.querySelector('#currentLocation');
const healthpool = document.querySelector('#health');
const attack_points = document.querySelector('#attack_points');
const defense_points = document.querySelector('#defense_points');
const luck = document.querySelector('#luck');
const btnSubmit = document.querySelector('#btnSubmit');
const characterImage = document.querySelector('#character_image');
const imgEnvironnement = document.querySelector('#imgEnvironnement');
let proceedTouUrban = false;
let afterChooseClass = false;
let afterChoice1 = false;


let loc;
const beasts = {
    wolf: {
        name: 'wolf',
        description: 'A giant wolf, with sharp teeth and claws. It looks hungry.',
        danger: '30',
        health: '100',
    },
    troll: {
        name: 'troll',
        description: 'A menacing troll with a giant club, stained with blood. Will I be its next victim?',
        danger: '40',
        health: '110',
    },
    dragon: {
        name: 'dragon',
        description: 'A huge red dragon, with a fiery breath. It\'s surrounded by bones of its victims.',
        danger: '60',
        health: '120',
    },
    crocodile: {
        name: 'crocodile',
        description: 'A huge crocodile, so big I can barely believe my eyes. It can, without a doubt, swallow me whole.',
        danger: '20',
        health: '90',
    }
};
const urbanDestinationsAr = ['Medieval town', 'Steampunk city', 'Elven Land' ,'Dwarven village'];
const urbanDestinations = {
    medievalTown: {
        name: 'medieval town',
        description: '<br> After a tough journey, you arrive in a medieval town, with cobblestone streets and old buildings. You can hear the sound of people talking and laughing. You feel a warm breeze on your face. For the first time in a couple days you finally feel safe. You want to rest a bit but you need to continue your journey.'},
    steampunkCity: {
        name: 'steampunk city',
        description: '<br> After a tough journey, you arrive in a steampunk city, with old buildings and lots ofsteam engines. You can hear the sound of people talking and laughing. You feel a warm breeze on your face. For the first time in a couple days you finally feel safe. You want to rest a bit but you need to continue your journey.'},
    elvenLand: {
        name: 'elven land',
        description: '<br> After a tough journey, you arrive in a elven land. You have heard a lot of stories about them, but never seen them. You look at the scene in awe. All the elves working together harmoniously is an oddly satisfying thing to watch. You order a meal, and after eating some delicious specialities, you decide to continue your journey.'},
    dwarvenVillage: {
        name: 'dwarven village',
        description: '<br> After a tough journey, you arrive in a dwarven village. Dwarves are working hard - as they are known for. You hear the sound of pickaxes hitting the stone, and hammers beating down on hot iron from the ironsmiths. After catching your breath and a tasty meal, you decide to continue your journey.'}
};


const crossRoads = {
    name: 'crossroads',
    img: 'img/Crossroads.png',
};
const arLocations = ['forest', 'desert', 'meadow', 'swamp', 'ruins'];
const startLocations = {
    forest: {
        name: 'forest',
        description: '<br>Around you, is a dark forest, with dense vegetation. You can hear the sound of birds and insects, but you can\'t see anything. You feel a cold breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Forest.jpg'
    },
    desert: {
        name: 'desert',
        description: '<br>You woke up with a sore throat in a hot desert, surrounded by sand dunes and cacti. You can hear the sound of the wind and the sand. You feel a hot breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Desert.jpg'
    },
    meadow: {
        name: 'meadow',
        description: '<br>When you woke up, you were surrounded by a beautiful meadow, with flowers and lucious green grass. You can hear the sound of the wind, the birds and some animals. You feel a chill breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Meadow.jpeg'
    },
    swamp: {
        name: 'swamp',
        description: '<br>You find youself in a dark swamp, with dense vegetation. You can hear the sound of birds and insects, but you can\'t see anything. You feel a chilling breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
        image: 'img/Swamp.png'
    },
    ruins: {
        name: 'abandoned ruins',
        description: '<br>When you woke up, you saw some ancient ruins, totally overgrown with vines. You don\'t recognise the style of the buildings, and wonder who built them and where you ended up... You can hear the sound of birds and insects, but can\'s see where it\'s coming from. You feel a cold breeze on your face. You can\'t remember how you got here, but you know you have to get out of here.',
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
    updateStats();
}

function addText(text) {
    textField.innerHTML += `${text} <br>`;
}

storyLine();
function storyLine() {
    // choose player class
    chooseClass();
    changeLocation(startLocations.forest.image);
    if (afterChooseClass == true) {
        phaseOne();
    }
}

function calculateLocation(){
    loc = startLocations[arLocations[Math.floor(Math.random() * arLocations.length)]]
    return loc;
}

btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    if (afterChooseClass == true || afterChoice1 == false) {
        console.log('keuze 1 bereikt')
        firstChoice();
    }
    if(afterChooseClass == false) {
        assignClass(e);
    }
})

function assignClass(e) {
    let playerChoice = playerInput.value.toLowerCase();
    player = playerClasses[playerChoice]; 
    console.log('playerlog1:' + player);
    console.log('playerlog2:' + player);
    addText('> ' + playerChoice); 
    playerInput.value = '';
    updateStats();
    displayLocation(calculateLocation());
    characterImage.src = player.sprite;
    afterChooseClass = true;
}

function chooseClass() {
    addText(`You wake up and remember who you are (Warrior, Paladin, Irishman or Adventurer) <br>
    > warrior: ${playerClasses.warrior.description} <br>
    > paladin: ${playerClasses.paladin.description} <br>
    > adventurer: ${playerClasses.adventurer.description} <br>
    > irishman: ${playerClasses.irishman.description} <br>`);
}

function displayLocation(loc) {
    console.log('loc:'+loc);
    // calculate location and display it
    calculateLocation();
    addText(loc.description);
    currentLocation.innerHTML = loc.name;
    imgEnvironnement.src = loc.image;
}

function updateStats() {
    healthpool.innerHTML = '';
    console.log('player.health:'+ player.health);
    if (player.health > 0) {
        healthpool.innerHTML = 'Health: ' + player.health;
    } else {
        console.log('death' + 'player.health:' + player.health)
        healthpool.innerHTML = 'You died!';
    }
    // empty stats
    attack_points.innerHTML = '';
    defense_points.innerHTML = '';
    luck.innerHTML = '';
    // fill in stats
    attack_points.innerHTML = 'Strength: ' + player.strength;
    defense_points.innerHTML = 'Vitality: ' + player.vitality;
    luck.innerHTML = 'Luck: ' + player.luck;
}

function changeLocation(imageLink) {

}

function phaseOne() {
    firstChoice();
}

function firstChoice() {
    do {
    addText('I have two choices. At my left, there is a cliff. Maybe I can jump down and get out of here. At my right there is a pathway leading to the horizon. I can\'t see where it leads, but it looks like a good idea to follow it. <br>');
    } while (checkcommand(['left', 'right']) == false);
    let choice = playerInput.value.toLowerCase();
    console.log('choice:'+choice);
    if (choice.includes('left')) {
        console.log('player before 1k dam:'+player);
        incomingDamage(1000);
        console.log('player after 1k dam'+player);
        addText(`I jump down the cliff. I land head first on a rock and die. \n`);
        // todo herstart
        return;
    }
    if (choice.includes('right')) {
        addText('I follow the pathway. After a while I arrive at a crossroads. \n');
        //changeLocation =>
        // secondChoice();
        return;
    }
}

function checkcommand(args) {
    btnSubmit.addEventListener('click', function(e) {
      e.preventDefault();
      args.forEach(argument => {
        if (playerInput.value == argument) {
          console.log('correct command');
          return true;
        }
      });
    return false;
    });
  }

function goBack() {
    // locale hub = variabele waarnaar teruggekeerd kan worden
}

function secondChoice() {
    addText(`4 options present themselves: <br>
    > A hungry beast. Maybe I can sneak past it. <br>
    > A poisonous river. I can see a sloop, though it does not look very sturdy. <br>
    > A steep cliff. There is a bridge, but it looks like it might break if I try to cross it. <br>
    > A dessert. I don\'t see any enemies, but I don\'t have any water on me ....<br>`);

    if(checkcommand(['beast', 'cliff', 'desert', 'river'])){
        switch (playerInput.value.toLowerCase()) {
            case 'beast': 
                addText('I try to sneak past the beast. It sees me and attacks me. I die. <br>');
                incomingDamage(1000); // kill the player
                break;
            case 'cliff': 
                addText('I try to cross the bridge. It breaks as soon as I set foot on land, but luckily I remain unharmed. <br>');
                player.health -= player.health/8; // removes 1/8 of the player HP
                proceedTouUrban = true;
                break;
            case 'desert': 
                addText('I try to cross the desert. I run out of water a lot earlier than expected. I surive by the skin of my teeth. <br>');
                player.health -= player.health/4; // removes 1/4 of the player HP
                proceedTouUrban = true;
                break;
            case 'river': 
                addText('I enter the sloop and begin the row. It\'s not very sturdy, so the poisonous fluid quickly fills the bottom of the boat. I survive but am not doing well ... <br>');
                player.health -= player.health/2; // removes 1/2 of the player HP
                proceedTouUrban = true;
                break;
        }
    }
};

