'use strict';

// define arrays with needed variables
const bossPrepositions = ['Ancient', 'Ominous', 'Terrible', 'Almighty', 'Evil', 'Dark', 'Mighty', 'Great', 'Powerful', 'Unstoppable', 'Unbeatable', 'Unkillable'];
const items = ['USB-stick', 'dish', 'metal stick', 'pencil', 'slipper', 'ice cube', 'iPod nano', 'brocolli', 'WIFI router', 'Raspberri Pi', 'eyeliner', 'eraser', 'rubber duck', 'PS2', 'truck', 'scooter', 'rock', 'button', 'cork', 'chalk', 'sandal', 'radio'];
const textField = document.querySelector('#txt__bottom');
const playerInput = document.querySelector('#playerInput');
const timer = document.querySelector('#playTime');

const parhealthbar = document.querySelector('#par__healthbar');

const currentLocation = document.querySelector('#currentLocation');
const healthpool = document.querySelector('#health');
const attack_points = document.querySelector('#attack_points');
const defense_points = document.querySelector('#defense_points');
const luck = document.querySelector('#luck');
const btnSubmit = document.querySelector('#btnSubmit');
const characterImage = document.querySelector('#character_image');
const imgEnvironnement = document.querySelector('#imgEnvironnement');
const playerInventory = document.querySelector('#inventoryContent');
const UI = document.querySelector('.content__right');
const healthBar = document.querySelector('#healthBar');
const weapon = document.querySelector('.weapon');
const shield = document.querySelector('.shield');

let proceedToUrban = false;
let choice;
let afterChooseClass = false;
let afterChoice1 = false;
let afterChoice2 = false;
let afterChoice3 = false;
let afterchallenge1Part1 = false;
let afterchallenge1Part2 = false;
let afterchallenge1 = false;
let challenge1Solved = false;
let challenge1TryCounter = 5;
let afterchallenge2 = false;
let challenge2Solved = false;
let challenge2TryCounter = 5;
let afterchallenge2Part1 = false;
let afterchallenge2Part2 = false;
let challenge3TryCounter = 5;
let afterchallenge3 = false;
let challenge3Solved = false;
let afterWitchEncounter = false;
let critSuccess = false;
let bossMissed = false;
let incDamage;
let outDamage;
let afterBossPart1 = false;
let afterBossPart2 = false;
let playerTurnEnded = false;
let bossTurnEnded = true;
let damage;
let initializeStory = false;
let eventListenerCheck = true;
let afterTown = false;
let afterfirstChallengeEncounter = false;
let bossHealth;
let afterWitchHut = false;
let afterBeforeWitchHut = false;
let afterEndingChoice = false;
let preventPlayerAttack = false;
let turn;
let aftermadeEndingchoice = false;
let proceedToEnding = false;
// boss variables
let boss;
const randomBossPreposition = bossPrepositions[Math.floor(Math.random() * (bossPrepositions.length - 1))];

let loc;
const beastsAr = ['wolf', 'troll', 'dragon', 'crocodile'];
const beasts = {
    wolf: {
        name: 'wolf',
        description: 'A giant wolf, with sharp teeth and claws. It looks hungry.',
        danger: 40,
        health: 100,
        img: 'img/wolf.jpeg',
        imgDead:'img/wolf_dead.jpeg',
        environment: 'forest',
    },
    troll: {
        name: 'troll',
        description: 'A menacing troll with a giant club, stained with blood. Will I be its next victim?',
        danger: 40,
        health: 110,
        img: 'img/troll.webp',
        environment: 'cave',
        imgDead:'img/troll_dead.png',
    },
    dragon: {
        name: 'dragon',
        description: 'A huge red dragon, with a fiery breath. It\'s surrounded by bones of its victims.',
        danger: 60,
        health: '120',
        img: 'img/dragon.jpeg',
        environment: 'abanoned castle',
        imgDead:'img/dragon_dead.jpeg',
    },
    crocodile: {
        name: 'crocodile',
        description: 'A huge crocodile, so big I can barely believe my eyes. It can, without a doubt, swallow me whole.',
        danger: 50,
        health: 90,
        img: 'img/crocodile.jpg',
        environment: 'swamp',
        imgDead:'img/crocodile_dead.jpg',
    }
};
const urbanDestinationsAr = ['medievalTown', 'steampunkCity', 'elvenLand', 'dwarvenVillage'];
const urbanDestinations = {
    medievalTown: {
        name: 'medieval town',
        description: 'After a tough journey, I arrive in a medieval town, with cobblestone streets and old buildings. I can hear the sound of people talking and laughing. I feel a warm breeze on my face. For the first time in a couple days I finally feel safe. Even tough I want to rest for a moment, I know that I need to continue...',
        img: 'img/medievalTown.webp'
    },
    steampunkCity: {
        name: 'steampunk city',
        description: 'After a tough journey, I arrive in a steampunk city. Old buildings are mixed with new ones, and the sound of steam engines can be heard troughout the whole town. I can hear the sound of people talking and laughing. I feel a warm breeze on your face. For the first time since my journey started I am feeling somewhat relaxed. I want to rest a bit but I need to continue my journey.',
        img: 'img/steampunkCity.jpeg'
    },
    elvenLand: {
        name: 'elven land',
        description: 'After a tough journey, I arrive in an elven land. I have heard a lot of stories about them, but never seen them myself. I look at the scene in awe. The many tall and slender elves are working together harmoniously is an oddly satisfying thing to watch. After having eaten a refreshing meal, it dawns on me that I need to continue my journey...',
        img: 'img/elvenLand.jpeg'
    },
    dwarvenVillage: {
        name: 'dwarven village',
        description: 'After a tough journey, I arrive in a dwarven village. Dwarves are working hard - as they are known for. I hear the sound of pickaxes hitting the stone, and hammers beating down on hot iron from within the many forges. After catching my breath and a tasty meal, I decide to continue my journey.  ',
        img: 'img/dwarvenVillage.webp'
    },
};

const crossRoads = {
    name: 'crossroads',
    img: 'img/Crossroads.png',
};
const arLocations = ['forest', 'desert', 'meadow', 'swamp', 'ruins'];
const startLocations = {
    forest: {
        name: 'forest',
        description: 'Around me is a dark forest, with dense vegetation. I can hear the sound of birds and insects, but can\'t see any of them. I feel a cold breeze on my face. I can\'t remember how I got here, but I know I have to get out of here.',
        image: 'img/Forest.jpg'
    },
    desert: {
        name: 'desert',
        description: 'I woke up with a sore throat in a hot desert, surrounded by sand dunes and cacti. I can hear the sound of the wind and the sand. I feel a hot breeze on my face. I can\'t remember how I got here, but I know I have to get out of here.',
        image: 'img/Desert.jpg'
    },
    meadow: {
        name: 'meadow',
        description: 'When I woke up, I was surrounded by a beautiful meadow, with flowers and lucious green grass. I can hear the sound of the wind, the birds and some animals. You feel a chill breeze on my face. I can\'t remember how I got here, but I know I have to get out of here.',
        image: 'img/Meadow.jpeg'
    },
    swamp: {
        name: 'swamp',
        description: 'I find myself in a dark swamp, with dense vegetation. I can hear the sound of birds and insects, but can\'t see anything. I feel a chilling breeze on your face. I can\'t remember how I got here, but I know I have to get out of here.',
        image: 'img/Swamp.png'
    },
    ruins: {
        name: 'abandoned ruins',
        description: 'When I woke up, I was surrounded by ancient ruins, totally overgrown with vines. I don\'t recognise the style of the buildings, and wonder who built them and where I ended up... I can hear the sound of birds and insects, but can\'s see where it\'s coming from. I feel a cold breeze on your face. I can\'t remember how I got here, but I know I have to get out of here.',
        image: 'img/Ruins.jpg'
    }
};
let player = null;
const playerClasses = {
    warrior: {
        name: 'warrior',
        description: 'a strong veteran that has won many battles',
        // 140 skillpoints to divide among stats
        strength: 80,
        luck: 80,
        vitality: 30,
        health: 100,
        sprite: 'img/Warrior.png',
        weapon: 'great sword',
        shield: 'great shield',
        items: [],
    },
    paladin: {
        name: 'paladin',
        description: 'a wise hermit with great magical knowledge',
        // 140 skillpoints to divide among stats
        strength: 30,
        luck: 80,
        vitality: 80,
        health: 150,
        sprite: 'img/Paladin.png',
        weapon: 'crystal staff',
        shield: 'mystic shield',
        items: [],
    },
    irishman: {
        name: 'irishman',
        description: 'a lucky irishman blessed by Saint Patrick',
        // 140 skillpoints to divide among stats
        strength: 90,
        luck: 170,
        vitality: 30,
        health: 100,
        sprite: 'img/Irishman.png',
        weapon: 'ancient shamrock sword',
        shield: 'lucky clover shield',
        items: [],
    },
    adventurer: {
        name: 'adventurer',
        description: 'a daring, well rounded adventurer',
        // 140 skillpoints to divide among stats
        strength: 80,
        luck: 110,
        vitality: 47,
        health: 120,
        sprite: 'img/Adventurer.png',
        weapon: 'spear',
        shield: 'adventurers shield',
        items: [],
    }
};

const endingsAr = ['good', 'bad'];
const endings = {
    good: {
        name: 'good',
        description: 'You choose to not take any chances, and with your remaining enery you drag yourself through the portal. You fall asleep almost immediatly, despite your sever wounds. In the morning you feel something on your face and shoot up immediatly. <span class="italic">"Is it not over yet?"</span> you think to yourself, but then you see your cat, looking at you very judgemental. Happy it\'s over, you pet your cat and go make yourself a coffee.',
    },
    bad: {
        name: 'bad',
        description: `I let myself go. Was it curiousity or greed? I\'ll never know... As soon as I opened up the chest, the  woman appeared. 
        <span class="italic">"Greedy bastard. How dare you lay eyes upon my treasure, let alone touch it? You will pay for this, you will pay with your life! You will be reincarnated as my next monster, until the next traveler defeats you."</span>
        Before I even could react, I felt my body starting to change. The pain was excruciating. Bones were being broken and rearranged to fit your new monster-like body. I don\'t want to accept this, but there is nothing I could do... I am now cursed to fight losts travelers forever...`,
    }
};

// Call the initial update functions
// updateTimer();

function closeWindow(event) {
    event.preventDefault();
    window.open('https://www.google.com', '_self', '');
    window.close();
}

function randomChance() {
    const succes = false;
    const chanceInt = ((Math.round(Math.random * 100) + player.luck) / 2);
    if (chanceInt >= 100) { succes = true }
    if (chanceInt < 100) { succes = false }
    return succes;
}

function outgoingDamage() {
    // critical hit calculator
    critSuccess = false;
    if ((Math.round(((Math.random() * 100) + player.luck)) / 2) >= 100) {
        critSuccess = true;
    }
    // damage calculator
    if (critSuccess == false) {
        outDamage = Math.round(Math.random() * player.strength);
    }
    if (critSuccess == true) {
        outDamage = (Math.round(Math.random() * player.strength)) * 2;
    }
    console.log('outgoing damage source:' + outDamage);
    return outDamage;
}

// danger is de max damage dat je kan krijgen, damage = 0 tot danger (niet tot en met)
function incomingDamage(danger) {
    bossMissed = false;
    if ((Math.round(((Math.random() * 100) + player.luck)) / 2) >= 100) {
        bossMissed = true;
        return;
    }
    incDamage = Math.round(Math.random() * danger);
    player.health -= incDamage;
    updateStats();
    console.log('incoming damage source:' + incDamage)
    return incDamage;
}

// this fuction add text to the textflield. Used during a dialogue, and everywhere else where new text is added
function addText(text) {
    textField.innerHTML += `<p><br>${text}</p>`;
}


function storyLine() {
    // choose player class
    chooseClass();
    // changeLocation(startLocations.forest.image);
    if (afterChooseClass == true) {
        phaseOne();
    }
}

// calculate a random location from the startLocations object to start the storyline
function calculateLocation() {
    loc = startLocations[arLocations[Math.floor(Math.random() * arLocations.length)]];
    return loc;
}

//chooseClass();
// location.replace('eindscherm.html')
sessionStorage.clear();
btnSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    scrollToBottom();
    // developer testing commands (you won't know these commands unless you see the code)
    addText(`> ${playerInput.value}`);
    if (playerInput.value == 'baguettekillplayer') {
        player.health = 0;
        updateStats();
    }
    if (playerInput.value == 'baguetteboss') {
        afterChoice1 = true;
        afterChoice2 = true;
        afterChoice3 = true;
        afterchallenge1 = true;
        challenge1Solved = true;
        challenge2Solved = true;
        challenge2Solved = true;
        afterchallenge2Part2 = true;
    }
    if (playerInput.value == 'baguettewinners') {
        location.replace('eindscherm.html');
    }
    // checks for storyline progression that call functions if checks are passed (more readable if you read from bottom to top)
    if (aftermadeEndingchoice == true && proceedToEnding == false) {
        endGame();
    }
    if (afterEndingChoice == true && aftermadeEndingchoice == false) {
        endingChoice();
    }
    if (afterBossPart2 == true && afterEndingChoice == false) {
        getRandomEnding();
    }
    if (turn == 'boss') {
        if (afterBossPart1 == true && afterBossPart2 == false) {
                console.log('DERDE LAYER');
                bossTurn();
            }
        return;
    }
    if (turn == 'player'){
            if (preventPlayerAttack == false && playerTurnEnded == false && bossTurnEnded == true && playerInput.value.toLowerCase() == 'attack') {
                console.log('TWEEDE LAYER');
                playerTurn();
            } else {
                wrongCommand();
            }
            playerInput.value = '';
            return;
    }
    if (afterWitchEncounter == true && afterBossPart1 == false) {
        console.log('bossEncounter')
        bossEncounter();
    }
    if (afterchallenge2Part2 == true && challenge3Solved == false) {
        console.log('thirdChallengePart1')
        thirdChallengePart1();
        if (challenge3Solved == true && afterchallenge3 == false) {
            console.log('thirdChallengePart2')
            thirdChallengePart2();
            if (afterchallenge3 == true && afterWitchEncounter == false) {
                console.log('witchEncounter')
                witchEncounter();
            }
        }
    }
    if (afterchallenge1 == true && challenge2Solved == false) {
        console.log('secondChallengePart1');
        secondChallengePart1();
        if (challenge2Solved == true && afterchallenge2Part2 == false) {
            console.log('secondChallengePart2');
            secondChallengePart2();
        }
    }
    if (afterfirstChallengeEncounter == true && challenge1Solved == false) {
        console.log('firstChallengePart1');
        firstChallengePart1();
        if (challenge1Solved == true && afterchallenge1 == false) {
            console.log('firstChallengePart2');
            firstChallengePart2();
        }
    }
    if (afterWitchHut == true && afterfirstChallengeEncounter == false) {
        console.log('firstChallengeEncounter');
        firstChallengeEncounter();
    }
    if (afterBeforeWitchHut == true &&afterWitchHut == false) {
        witchHut();
    }
    if (afterChoice3 == true && afterBeforeWitchHut == false) {
        beforeWitchHut();
    }
    if (afterChoice1 == true && afterChoice2 == false) {
        console.log('secondChoice');
        secondChoice();
        if (afterChoice2 == true && afterChoice3 == false) {
            console.log('thirdChoice')
            thirdChoice();
        }
    }
    if (afterChooseClass == true && afterChoice1 == false) {
        console.log('firstChoice');
        firstChoice();
    }
    if (initializeStory == true && afterChooseClass == false) {
        console.log('assignClass');
        assignClass(e);
    }
    if (initializeStory == false) {
        console.log('chooseClass');
        chooseClass();
    }
    // clear player input
    playerInput.value = '';
})

function assignClass(e) {
    // handler for a wrong command !!Very important!!
    try {classErrorHandler() }
    catch (error) {
        wrongCommand();
        return;
    }
    // adds weapon and shield images to UI
    weapon.innerHTML += `<img class="weapon_image" src="img/weapon.png" alt="weapon icon"> <p>${player.weapon}</p>`;
    shield.innerHTML += `<img class="shield_image" src="img/shield.png" alt="shield icon"> <p>${player.shield}</p>`;
    // displays the location returned by calculateLocation
    displayLocation(calculateLocation());
    // adds the character sprite to the UI
    characterImage.src = player.sprite;
    // sets the bool to true for storyline checks
    afterChooseClass = true;
    // text for the next choice
    addText('I have two choices. At my <span class="keyword">left</span>, there is a cliff. Maybe I can jump down and get out of here. At my <span class="keyword">right</span> there is a pathway leading to the horizon. I can\'t see where it leads, but it looks like a good idea to follow it.');
    // displays the fully filled in UI
    UI.classList.remove('hidden');
}

// function that handles errors for the assignclass function
function classErrorHandler() {
    // declares and assigns the variable: playerchoice
    let playerChoice = playerInput.value.toLowerCase();
    // sets the player variable to the selected class in the playerClasses object
    player = playerClasses[playerChoice];
    // clears the player input field
    playerInput.value = '';
    // calls the updateStats function
    updateStats();
}

// displays the class options to choose from
function chooseClass() {
    addText(`I wake up, and remember who you are <span class="italic">(please select your class by typing one of the <span class="keyword">highlighted</span> words below)</span> 
    <br>> <span class="keyword">warrior</span>: ${playerClasses.warrior.description} 
    <br>> <span class="keyword">paladin</span>: ${playerClasses.paladin.description} 
    <br>> <span class="keyword">adventurer</span>: ${playerClasses.adventurer.description} 
    <br>> <span class="keyword">irishman</span>: ${playerClasses.irishman.description}`);
    initializeStory = true;
}

// displays location in the top left corner
function displayLocation(loc) {
    // calculate location and display the location image and description
    calculateLocation();
    addText(loc.description);
    currentLocation.innerHTML = loc.name;
    imgEnvironnement.src = loc.image;
}

// function that updates the player statistics
function updateStats() {
    // clears UI health displays
    healthpool.innerHTML = '';
    if (player.health > 0) {
        healthpool.innerHTML = 'Health: ' + player.health;
    } else {
        healthpool.innerHTML = 'You died!';
        // location.replace gevonden op https://www.tutorialspoint.com/How-to-redirect-to-another-webpage-using-JavaScript
        if (sessionStorage.getItem(`deathMessage`) == null) {
            setDeathMessage("your health dropped to zero, you died");
        }
        location.replace('deathscherm.html');
    }

    // empty stats
    attack_points.innerHTML = '';
    defense_points.innerHTML = '';
    luck.innerHTML = '';
    // fill in stats
    attack_points.innerHTML = 'Strength: ' + player.strength;
    defense_points.innerHTML = 'Vitality: ' + player.vitality;
    luck.innerHTML = 'Luck: ' + player.luck;

    // update inventory
    if (player.items.length > 0) {
        playerInventory.innerHTML = '';
        for (let i = 0; i < player.items.length; i++) {
            playerInventory.innerHTML += '>' + player.items[i] + '<br>';
        }
    }
    if (afterWitchEncounter){
        player.items = [];
    }
}

function firstChoice() {
    let choice = playerInput.value.toLowerCase();
    if (choice.includes('left')) {
        setDeathMessage('I jump down the cliff, hoping this is an easy option. This, however did not play out as planned. I landed head first on a rock and died.')
        killPlayer();
        return;
    }
    if (choice.includes('right')) {
        addText('I follow the pathway. After a while I arrive at a crossroads.');
        // changeLocation
        imgEnvironnement.src = crossRoads.img;
        // secondChoice();
        addText(`4 options present themselves: 
        <br>> <span class="keyword">beast</span>: A hungry beast. Maybe I can sneak past it. 
        <br>> <span class="keyword">river</span>: A poisonous river. I can see a sloop, though it does not look very sturdy. 
        <br>> <span class="keyword">cliff</span>: A steep cliff. There is a bridge, but it looks like it might break if I try to cross it. 
        <br>> <span class="keyword">desert</span>: A seemingly endless desert. I don\'t see any enemies, but I probably don\'t have any water on me ....`);
        afterChoice1 = true;
        return;
    }

    // if none of the above commands were passed (and subsequently returned) the wrongcommand function is called
    wrongCommand();
}

  // developer function to test the killing of the player
function killPlayer() {
    player.health = -1;
    updateStats();
}


function secondChoice() {
    choice = playerInput.value.toLowerCase();
    if (choice.includes('beast')) {
        setDeathMessage(`I try to sneak past the beast. It sees me and attacks me. I die.`);
        killPlayer(); // kill the player
        return;
    }
    else if (choice.includes('river')) {
        addText(`I enter the sloop and begin the row. It\'s not very sturdy, so the poisonous fluid quickly fills the bottom of the boat. I survive but am not doing well ... I lose ${player.health / 2} health.`);
        player.health -= player.health / 2; // removes 1/2 of the player HP
        updateStats();
        proceedToUrban = true;

    }
    else if (choice.includes('cliff')) {
        addText(`I try to cross the bridge. It breaks as soon as I set foot on land. I stumble from shock and hurt my big toe. I took a little bit of damage. I lost ${player.health / 8} health`);
        player.health -= player.health / 8; // removes 1/8 of the player HP
        updateStats();
        proceedToUrban = true;

    }
    else if (choice.includes('desert')) {
        addText(`I try to cross the desert. I get thirsty a lot earlier than expected. I surive by the skin of my teeth. I lose ${player.health / 4} health.`);
        player.health -= player.health / 4; // removes 1/4 of the player HP
        updateStats();
        proceedToUrban = true;
    } else {
        wrongCommand();
        return;
    }
    updateStats();
    playerInput.value = '';
    afterChoice2 = true;
};

function thirdChoice() {
    // display random new location
    const randomLocation = urbanDestinationsAr[Math.floor(Math.random() * (urbanDestinationsAr.length - 1))];
    const urbanLoc = urbanDestinations[randomLocation];
    imgEnvironnement.src = urbanLoc.img;
    currentLocation.innerHTML = urbanLoc.name;
    addText(urbanLoc.description);
    afterChoice3 = true;
    addText('<br>Press <span class="keyword italic">Enter</span> to continue.');
}

function beforeWitchHut() {
    imgEnvironnement.src = 'img/witch.jpg'
    addText(`I feel a cold hand on my shoulder: <span class="italic">"I have never seen you around here, traveler"</span>, an old woman with a mysterious aura says to me. 
    <br> <span class="italic">"I can help you on your quest when you obtain 3 items. Only you know which items you seek. I left a gift for you at the big tree in the town square. Have a rest at my place to regain some health. Trust me you will need it."</span>`);
    addText('<br>Press <span class="keyword italic">Enter</span> to continue.')
    afterBeforeWitchHut = true;
}

function witchHut() {
    imgEnvironnement.src = 'img/hut.webp';
    addText(`<br> Even though she gives off some weird vibes, I really need the rest. So I follow her back to her hut
    <br> *after a restfull night you wake up refreshed (+ 50hp), you grab a snack, but the stranger is no where to be found`);
    addText('<br>Press <span class="keyword italic">Enter</span> to continue.')
    afterWitchHut = true;
}

function firstChallengeEncounter() {
        // initiate challenge 1
        currentLocation.innerHTML = 'Challenge 1: Sudoku';
        imgEnvironnement.src = 'img/sudoku.png';
        addText(`the next Mysterious helper you meet says: 
        <br><span class="italic">"Sorry mijn English is not ferry goed, dus ik spiek in Nederlands. Vind het magische woord aan de hand van de missende nummers en je zal rijkelijk beloond worden.
        <br> Vul de nummers in van links naar rechts, en van boven naar beneden."</span> 
        <br> +-----------------------------------+
        <br> | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
        <br> +-----------------------------------+
        <br> | A | B | C | D | E | F | G | H | I |
        <br> +-----------------------------------+`);
        afterfirstChallengeEncounter = true
}

function firstChallengePart1() {
    choice = playerInput.value.toLowerCase();
    if (challenge1TryCounter == 1) {
        challenge1Solved = true;
        addText('ERROR: puzzle bypassed by too low intellingence');
        return;
    }
    if (choice.toLowerCase() == 'dead') {
        challenge1Solved = true;
    }
    if (playerInput.value.toLowerCase() != 'dead') {
        challenge1TryCounter--;
        addText('Wrong! Please try again.');
        addText(`you have ${challenge1TryCounter} tries left`)
    }
}

function firstChallengePart2() {
    addText(`<span class="italic">"Your reward is: a ${giveReward()}"</span>`);
    afterchallenge1 = true;
    // initiate challenge 2
    currentLocation.innerHTML = 'Challenge 2: The Spanish Test';
    imgEnvironnement.src = 'img/spanish.png';
    addText(`After completing the previous challenge, I am aproached by a jovial looking man with an enormous sombrero; so big that it totally covers his face.`);
    addText(`<span class="italic">"Hola amigo. I have a challenge for you. Don\'t worry, it\'s not too hard. Tell me how many tries it took you to complete the previous challenge - in Spanish of course. If you failed to solve it, tell me what "six" is in Spanish. Vamos!"</span>`);
}

function secondChallengePart1() {
    let answer;
    switch (challenge1TryCounter) {
        case 5:
            answer = 'uno';
            console.log('challeng1trycounter: 1')
            break;
        case 4:
            answer = 'dos';
            console.log('challeng1trycounter: 2')
            break;
        case 3:
            answer = 'tres';
            console.log('challeng1trycounter: 3')
            break;
        case 2:
            answer = 'quatro';
            console.log('challeng1trycounter: 4')
            break;
        case 1:
            answer = 'cinco';
            console.log('challeng1trycounter: 5')
        case 0:
            answer = 'seis';
            console.log('challeng1trycounter: 6')
            break;
    }

    choice = playerInput.value.toLowerCase();
    if (choice.toLowerCase() == answer) {
        challenge2Solved = true;
    }
    if (challenge2TryCounter == 1) {
        challenge2Solved = true;
        addText('<span class="italic"AY CARAMBA! puzzle bypassed by too low intellingence></span>');
        return;
    }
    if (playerInput.value.toLowerCase() != answer) {
        challenge2TryCounter--;
        addText('<span class="italic">Equivocado! Please try again.</span>');
        addText(`You have ${challenge2TryCounter} tries left`)
        return;
    }
}

function secondChallengePart2() {
    addText('Great job! You have solved the puzzle!');
    addText(`<span class="italic">"You passed my challenge, your reward is a ${giveReward()}"</span>`);
    afterchallenge2Part2 = true;
    // intiate challenge 3
    currentLocation.innerHTML = 'Challenge 3: The German Jigsaw';
    addText(`You are aproached by an odd looking fellow wearing lederhosen. He reeks of beer and sauerkraut. He says:
    <br><span class="italic">"Gutentag mein Freund. I need your help. I am very hungover and can\'t concentrate. I absolutely need to solve this puzzle. Can you do it for me? I will reward you handsomely. Combine all the letters into a word, and tell me what it is.</span>`);
    imgEnvironnement.src = 'img/jigsaw.png';
}

// give  a random reward
function giveReward() {
    const reward = items[Math.floor(Math.random() * (items.length - 1))];
    items.splice(items.indexOf(reward), 1);
    player.items.push(reward);
    updateStats();
    return reward;
}


function thirdChallengePart1() {
    let answer = 'sagen!';
    choice = playerInput.value.toLowerCase();
    if (choice == answer) {
        challenge3Solved = true;
        return;
    }
    if (challenge3TryCounter == 1) {
        challenge3Solved = true;
        addText('<span class="italic">Das war nicht gut ... Here is your reward anyway. The word was "sagen!"</span>');
        return; 
    }
    if (choice != answer) {
        challenge3TryCounter--;
        addText('<span class="italic">Falsch! Please try again.</span>');
        addText(`you have ${challenge3TryCounter} tries left`)
        return;
    }
}

function thirdChallengePart2() {
    addText(`<span class="italic">"You passed the test, your reward is a ${giveReward()}</span>"`)
    afterchallenge3 = true;
    currentLocation.innerHTML = 'The old woman\'s hut';
    imgEnvironnement.src = 'img/hut.webp';
    addText(`I head back to the old woman\'s hut. I knock on the door, but no one answers. I knock a second time. No answer. Luckily the door is not very sturdy. I take my ${player.shield} and bash the door in. As soon as I do that, she magically appears in front of me, surrounded by a dark aura.
    <br><span class="italic">"Congratulations traveler. I didn\'t think you would make it this far. Let me help you on your quest."</span> 
    <br>She starts speaking an ancient language, and I start to feel a little dizzy. My conciousness starts to fade, but before that happens I come back to my senses. I have never felt this good. 
    <br><span class="italic">"I cast a spell on you. You will now be able to defeat your final foe, and go home. Good luck!"</span>
    <br>She disappears in a puff of smoke.`);
}

// initiates witch encounter, where player turns in items and receives buffs
function witchEncounter() {
    // apply buffs to player
    player.health += 30;
    player.strength += 10;
    player.defense += 10;
    addText('Press <span class="italic keyword">Enter</span> to continue...');
    afterWitchEncounter = true;
}

// choose random boss
function selectBoss() {
    boss = beasts[beastsAr[Math.floor(Math.random() * beastsAr.length)]];
}

// initiate boss e
function bossEncounter() {
    selectBoss();
    addText(`Now feeling very strong and refreshed, I continue on my path. Suddenly, while walking through a ${boss.environment}, 
    The ${randomBossPreposition} ${boss.name} appears before me.`);
    bossHealth= boss.health;
    currentLocation.innerHTML = `${boss.environment}`;
    imgEnvironnement.src = boss.img;
    healthBar.classList.remove('hidden');
    healthBar.innerHTML += ' ' + bossHealth;
    updateStats();
    playerInventory.innerHTML = '';
    updateBossHealth();
    healthBar.style.backgroundColor = 'rgb(111, 111, 111)'
    addText(`Adrenaline rushes through my veins. I am ready to fight. I take out my ${player.weapon} and ${player.shield} and prepare for battle.`);
    addText(`I\'m ready to <span class="keyword">attack</span>`);
    afterBossPart1 = true;
    turn = 'player';
}

// function that ends the game
function endGame() {
    location.replace('eindscherm.html');
}

// Q: where should i implement the updateplayerhealth function within the playerturn function?



// function for the player's turn in the combat system
function playerTurn() {
    if (player.health == 0 || player.health < 0) {
        setDeathMessage('i feel a sharp pain. i look down to see my legs lying on the floor 10 metres in front of me. The last thing i see before i pass out is my enemy, smiling at me.')
        return;
    }
    addText(`I swing my sword at the enemy...`);
    const outDamage = outgoingDamage();
    console.log('outgoing damage implemented:' + outDamage)
    if (critSuccess == true) {
        addText(`CRITICAL HIT!!! I hit the boss for ${outDamage} damage`);
    }
    if (critSuccess == false) {
        addText(`HIT! I attack the boss for ${outDamage} damage`);
    }
    bossHealth -= outDamage;
    updateBossHealth();
    playerTurnEnded = true;
    bossTurnEnded = false;
    preventPlayerAttack = true;
    updatePlayerHealth();
    turn = 'boss';
    if (bossHealth == 0 || bossHealth < 0) {
        addText(`The boss roars loadly as he falls to the ground. The ${randomBossPreposition} ${boss.name} is <span class="dead">dead</span>!`);
        afterBossPart2 = true;
        hideBossBar();
        addText('Press <span class="italic keyword">Enter</span> to continue...');
        imgEnvironnement.src = boss.imgDead;
        return;
    }
    addText('<br>Press <span class="keyword italic">Enter</span> to continue.')
}


// function for the boss's turn in the combat system
function bossTurn() {
    incomingDamage(boss.danger);
    addText(`The ${randomBossPreposition} ${boss.name} attacks you...`);
    if (bossMissed == true) {
        addText(`!!!The ${randomBossPreposition} ${boss.name} MISSED!!!`);
    }
    if (bossMissed == false) {
        addText(`The boss hits you for ${incDamage} damage`);
    }
    bossTurnEnded = true;
    playerTurnEnded = false;
    preventPlayerAttack = false;
    turn = 'player';
    if (bossHealth == 0 || bossHealth < 0) {
        addText(`The boss roars loadly as he falls to the ground. The ${randomBossPreposition} ${boss.name} is <span class="dead">dead</span>!`);
        afterBossPart2 = true;
        hideBossBar();
        addText('Press <span class="italic keyword">Enter</span> to continue...');
        imgEnvironnement.src = boss.imgDead;
        return;
    }
    addText(`Let\'s <span class="keyword">attack</span>!"`);
}

//scrollToBottom technique found on https://gist.github.com/sabapathygithub/e6ca2c0fd06c21c5fb608b9a172ca3c4
function scrollToBottom(timedelay = 0) {
    var scrollId;
    var height = 0;
    var minScrollHeight = 100;
    scrollId = setInterval(function () {
        if (height <= document.body.scrollHeight) {
            window.scrollBy(0, minScrollHeight);
            textField.scrollBy(0, minScrollHeight);
        }
        else {
            clearInterval(scrollId);
        }
        height += minScrollHeight;
    }, timedelay);
}

function relativePercentage(currentScore, originalScore){
    const answer = parseInt((currentScore / originalScore)* 100);
    return answer;
}

// funtion to update the boss's health in the combat system
function updateBossHealth(){
    flashBossHealthBar();
    if (bossHealth < 0) {
        healthBar.innerHTML = `<div class="health" style="width: ${relativePercentage(bossHealth, boss.health)}%"></div>
        <div class="health_text">The ${randomBossPreposition} ${boss.name} HP: 0</div>`
    } else {
    healthBar.innerHTML = `<div class="health" style="width: ${relativePercentage(bossHealth, boss.health)}%"></div>
    <div class="health_text">The ${randomBossPreposition} ${boss.name} HP:${bossHealth}</div>` 
    }
    //parhealthbar.innerHTML = randomBossPreposition + ' ' +  boss.name + ' ' + boss.health; // bron chatgpt
}
// apply the same (relativepercentage) technique to the player's healthbar
function updatePlayerHealth(){
    flashPlayerHealthBar();
    if (player.health < 0) {
        healthpool.innerHTML = `<div class="health" style="width: ${relativePercentage(player.health, player.health)}%"></div>
        <div class="health_text">Your HP: 0</div>`
    } else {
    healthpool.innerHTML = `<div class="health" style="width: ${relativePercentage(player.health, player.health)}%"></div>
    <div class="health_text">Your HP: ${player.health}</div>`
    }
}
// q: where should i implement this function within the playerturn function?
// a: i implemented it in the playerturn function, right after the player attacks



    // function to display the wrongcommand
function wrongCommand() {
    addText(' Wrong command, please enter a valid command');
}

let timeLimit = 900; // Set the time limit to 600 seconds (10 minutes)
let timeRemaining = timeLimit; // Initialize the time remaining to the time limit
let score = 10000; // Initialize the score to 10000

// Function to update the timer display
function updateTimer() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timer.innerHTML = `Time Remaining: 
  <br>${minutes}m ${seconds}s`;
}

// Function to update the score display
function updateScore() {
    //document.getElementById('score').textContent = `Score: ${score}`;
}

// Function to decrease time remaining and update score
function decreaseTime() {
    timeRemaining--;

    // Update the score based on the time remaining
    if (timeRemaining > 0) {
        score -= Math.floor(10000 / timeLimit); // Decrease score as time passes
        sessionStorage.setItem('score', `${score}`)
    } else {
        score += 10; // Award a fixed score of 10 when time is up
    }

    updateTimer();

    // Check if time is up
    if (timeRemaining === 0) {
        clearInterval(timerInterval); // Stop the timer
        location.replace('deathscherm.html');
        setDeathMessage('You ran out of time');
        eventListenerCheck = false;
    }
}
// Start the timer
let timerInterval = setInterval(decreaseTime, 1000); // Decrease time every second

// Call the initial update functions
updateTimer();

function setDeathMessage(message) {
    // sessionstorage technique found on https://lage.us/Javascript-Pass-Variables-to-Another-Page.html
    sessionStorage.setItem("deathMessage", `${message}`);
}
// function that sets up the choice for the ending
function getRandomEnding(){
    addText(`I immerse victoriously after a though battle with the ${boss.name} and I\'m now presented with a dilema. I see a <span class="keyword italic">portal</span> opening that will lead me home, the place I have
    longed for this entire journey, but in the corner of my eye I see a shiny <span class="keyword italic">treasure</span> chest and I\'m very curious to take a look at it. What interests me more?
    `);
    afterEndingChoice = true;
}

// function to hide the boss's healthbar after combat is over
function hideBossBar() {
    document.querySelector('.health_text').classList.add('hidden');
    healthBar.classList.add('hidden');
    healthBar.style.backgroundColor = 'black'
}

// function to handle the player's choice of ending
function endingChoice() {
    if (playerInput.value == 'treasure') {
        addText(endings.bad.description);
        aftermadeEndingchoice = true;
        addText('<br>Press <span class="keyword italic">Enter</span> to continue.');
        sessionStorage.setItem('ending', 'bad ending');
        return;
    }
    if (playerInput.value == 'portal') {
        addText(endings.good.description);
        aftermadeEndingchoice = true;
        addText('<br>Press <span class="keyword italic">Enter</span> to continue.');
        sessionStorage.setItem('ending', 'good ending')
        return;
    } 
    {
        wrongCommand();
    }
}

// have the bosshealthbar flash white when the player attacks
function flashBossHealthBar() {
    healthBar.style.backgroundColor = 'white';
    setTimeout(function () {
        healthBar.style.backgroundColor = 'rgb(111, 111, 111)'
    }, 300);
}
// how should i implement the flashbosshealthbar function you just wrote?
// have the bosshealthbar flash white when the player attacks
function flashPlayerHealthBar() {
    healthpool.style.backgroundColor = 'white';
    setTimeout(function () {
        healthpool.style.backgroundColor = 'rgb(111, 111, 111)'
    }, 300);
}
// Q: how did i make the bosshealthbar smaller when the boss takes damage?
// A: i used the relativePercentage function to calculate the percentage of the boss's health and then used that percentage to set the width of the healthbar
// q: where did i use this?
// a: in the updateBossHealth function
//q: why is the healthbar2 above the health stat?
//a: because the healthbar2 is a child of the healthpool div, and the healthpool div is above the health stat
//q: to where exactly do i need to move the healthbar2 div?
//a: to the healthpool div
// rewrite the html for the healthbar2 div so that i need only copy paste it into the healthpool div











