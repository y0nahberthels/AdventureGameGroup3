'use strict';

// define arrays with needed variables
const bossPrepositions = ['The Ancient', 'The Ominous', 'The Terrible', 'The Almighty', 'The Evil', 'The Dark', 'The Mighty', 'The Great', 'The Powerful', 'The Unstoppable', 'The Unbeatable', 'The Unkillable'];
const items = ['USB-stick', 'dish', 'metal stick', 'pencil', 'slipper', 'ice cube', 'iPod nano', 'brocolli', 'WIFI router', 'Raspberri Pi', 'eyeliner', 'eraser', 'rubber duck', 'PS2', 'truck', 'scooter', 'rock', 'button', 'cork', 'chalk', 'sandal', 'radio' ]; 
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
const playerInventory = document.querySelector('#inventoryContent');
const SnS = document.querySelector('.armory_inventory');
const UI = document.querySelector('.content__right');
const healthBar = document.querySelector('#healthBar');

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
let afterBoss = false;
let critSuccess = false;
let bossMissed = false;
let incDamage;
let afterBossPart1 = false;
let afterBossPart2 = false;
let playerTurnEnded = false;
let bossTurnEnded = true;
let damage;

// boss variables
let boss;
const randomBossPreposition = bossPrepositions[Math.floor(Math.random() * (bossPrepositions.length - 1))];

let loc;
const beastsAr = ['wolf', 'troll', 'dragon', 'crocodile'];
const beasts = {
    wolf: {
        name: 'wolf',
        description: 'A giant wolf, with sharp teeth and claws. It looks hungry.',
        danger: '30',
        health: '100',
        img: 'img/wolf.jpeg',
        environment: 'forest',
    },
    troll: {
        name: 'troll',
        description: 'A menacing troll with a giant club, stained with blood. Will I be its next victim?',
        danger: '40',
        health: '110',
        img: 'img/troll.webp',
        environment: 'cave',
    },
    dragon: {
        name: 'dragon',
        description: 'A huge red dragon, with a fiery breath. It\'s surrounded by bones of its victims.',
        danger: '60',
        health: '120',
        img: 'img/dragon.jpeg',
        environment: 'abanoned castle',
    },
    crocodile: {
        name: 'crocodile',
        description: 'A huge crocodile, so big I can barely believe my eyes. It can, without a doubt, swallow me whole.',
        danger: '20',
        health: '90',
        img: 'img/crocodile.jpg',
        environment: 'swamp',
    }
};
const urbanDestinationsAr = ['medievalTown', 'steampunkCity', 'elvenLand' ,'dwarvenVillage'];
const urbanDestinations = {
    medievalTown: {
        name: 'medieval town',
        description: '<br> After a tough journey, you arrive in a medieval town, with cobblestone streets and old buildings. You can hear the sound of people talking and laughing. You feel a warm breeze on your face. For the first time in a couple days you finally feel safe. You want to rest a bit but you need to continue your journey.',
        img: 'img/medievalTown.webp'},
    steampunkCity: {
        name: 'steampunk city',
        description: '<br> After a tough journey, you arrive in a steampunk city, with old buildings and lots ofsteam engines. You can hear the sound of people talking and laughing. You feel a warm breeze on your face. For the first time in a couple days you finally feel safe. You want to rest a bit but you need to continue your journey.',
        img: 'img/steampunkCity.jpeg'},
    elvenLand: {
        name: 'elven land',
        description: '<br> After a tough journey, you arrive in a elven land. You have heard a lot of stories about them, but never seen them. You look at the scene in awe. All the elves working together harmoniously is an oddly satisfying thing to watch. You order a meal, and after eating some delicious specialities, you decide to continue your journey.',
        img: 'img/elvenLand.jpeg'},
    dwarvenVillage: {
        name: 'dwarven village',
        description: '<br> After a tough journey, you arrive in a dwarven village. Dwarves are working hard - as they are known for. You hear the sound of pickaxes hitting the stone, and hammers beating down on hot iron from the ironsmiths. After catching your breath and a tasty meal, you decide to continue your journey.  ',
        img: 'img/dwarvenVillage.webp'},
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
        strength: 80,
        luck: 30,
        vitality: 30,
        health: 100,
        sprite: 'img/Warrior.png',
        weapon: 'great sword',
        shield: 'great shield',
        items: [],
    },
    paladin: {
        name: 'paladin',
        description:'a wise hermit with great magical knowledge',
        // 140 skillpoints to divide among stats
        strength: 30,
        luck: 30,
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
        strength: 30,
        luck: 80,
        vitality:30,
        health: 100,
        sprite: 'img/Irishman.png',
        weapon: 'mace',
        shield: 'lucky clover shield',
        items: [],
    },
    adventurer: {
        name: 'adventurer',
        description: 'a daring, well rounded adventurer',
        // 140 skillpoints to divide among stats
        strength: 46,
        luck: 47,
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
        description: '<br>You choose to not take any chances, and with your remaining enery you drag yourself through the portal. You fall asleep almost immediatly, despite your sever wounds. In the morning you feel something on your face and shoot up immediatly. "Is it not over yet?" you think to yourself, but then you see your cat, looking at you very judgemental. Happy it\'s over, you pet your cat and go make yourself a coffee.',
    },
    bad: {
        name: 'bad',
        description: `<br>You let yourself go. Was it curiousity or greed? You\'ll never know... As soon as you openen up the chest, the old woman appeared. 
        <br>>>"Greedy bastard. How are you lay eyes upon my treasure, let alone touch it? You will pay for this, you will pay with your life! You will be reincarnated as the next boss, until the next traveler frees you."
        <br>Before even could react, you feel your body is starting to change. The pain is excruciating. Bones are being broken and rearranged to fit your new bodily composition. You don\'t want to accept this, but there is nothing you can do... You are now the next boss.`,
    }
};

function closeWindow(event) {
    event.preventDefault();
    window.open('https://www.google.com', '_self', '');
    window.close();
}

function randomChance() {
    const succes = false;
    const chanceInt = ((Math.round(Math.random * 100) + player.luck) / 2);
    if (chanceInt >= 100){succes = true}
    if (chanceInt < 100){succes = false}
    return succes;
}

function outgoingDamage() {
    //critical hit calculator
    critSuccess = false;
    if ((Math.round(((Math.random() * 100) + player.luck)) / 2) >= 100 ) {
        critSuccess = true;
    }
    //damage calculator
    if (critSuccess == false) {
        let damage = Math.round(Math.random * player.strength);
    }
    if (critSuccess == true) {
        let damage = (Math.round(Math.random * player.strength)) * 2;
    }
    return damage;
}

// danger is de max damage dat je kan krijgen, damage = 0 tot danger (niet tot en met)
function incomingDamage(danger) {
    bossMissed = false;
    if ((Math.round(((Math.random() * 100) + player.luck)) / 2) >= 100 ) {
        bossMissed = true;
        return;
    }
    let damage = Math.round(Math.random() * danger);
    player.health -= incDamage;
    updateStats();
    return incDamage;
}

function addText(text) {
    textField.innerHTML += `<br>${text} `;
}

function storyLine() {
    // choose player class
    chooseClass();
    //changeLocation(startLocations.forest.image);
    if (afterChooseClass == true) {
        phaseOne();
    }
}

function calculateLocation(){
    console.log('urbanDestinationsAr'+urbanDestinationsAr)
    loc = startLocations[arLocations[Math.floor(Math.random() * arLocations.length)]];
    return loc;
}

chooseClass();
//location.replace('eindscherm.html')
btnSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    scrollToBottom();
    if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == true && afterchallenge2Part2 == true && challenge3Solved == true && afterchallenge3 == true && afterWitchEncounter == true && afterBossPart1 == true && afterBossPart2 == false) {
        if (playerTurnEnded == false && bossTurnEnded == true && playerInput.value.toLowerCase() == 'attack') {
            playerTurn();
        }
    }
    if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == true && afterchallenge2Part2 == true && challenge3Solved == false) {
        thirdChallengePart1();
        if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == true && afterchallenge2Part2 == true && challenge3Solved == true && afterchallenge3 == false) {
            thirdChallengePart2();
            if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == true && afterchallenge2Part2 == true && challenge3Solved == true && afterchallenge3 == true && afterWitchEncounter == false) {
                witchEncounter();
                if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == true && afterchallenge2Part2 == true && challenge3Solved == true && afterchallenge3 == true && afterWitchEncounter == true && afterBossPart1 == false) {
                    bossEncounter();
                }
            }
        }
    }
    if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == false) {
        secondChallengePart1();
        if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && afterchallenge1 == true && challenge2Solved == true && afterchallenge2Part2 == false) {
            secondChallengePart2();
        }
    }
    if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && challenge1Solved == false) {
        firstChallengePart1();
        if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == true && challenge1Solved == true && afterchallenge1 == false) {
            firstChallengePart2();
        }
    }
    if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == false) {
        console.log('keuze 2 bereikt');
        secondChoice();
        if (afterChooseClass == true && afterChoice1 == true && afterChoice2 == true && afterChoice3 == false) {
            console.log('keuze 3 bereikt');
            thirdChoice();
        }
    }
    if (afterChooseClass == true && afterChoice1 == false) {
        console.log('keuze 1 bereikt');
        firstChoice();
    }
    if(afterChooseClass == false) {
        assignClass(e);

    }
    if (playerInput.value == 'kill') {
        killPlayer();
    }
    playerInput.value = '';
    console.log('afterchooseClass:'+afterChooseClass);
    console.log('afterChoice1:'+ afterChoice1);
    console.log('afterChoice2:' + afterChoice2);
    console.log('afterChoice3:' + afterChoice3);
})

function assignClass(e) {
    let playerChoice = playerInput.value.toLowerCase();
    player = playerClasses[playerChoice]; 
    console.log('playerlog1:' + player);
    console.log('playerlog2:' + player);
    addText('> ' + playerChoice); 
    playerInput.value = '';
    updateStats();
    SnS.innerHTML += `<br>> ${player.weapon} 
    <br>> ${player.shield}`;
    displayLocation(calculateLocation());
    characterImage.src = player.sprite;
    afterChooseClass = true;
    addText('<br>I have two choices. At my left, there is a cliff. Maybe I can jump down and get out of here. At my right there is a pathway leading to the horizon. I can\'t see where it leads, but it looks like a good idea to follow it.');
    UI.classList.remove('hidden');
}

function chooseClass() {
    addText(`You wake up and remember who you are (Warrior, Paladin, Irishman or Adventurer)
    <br>> warrior: ${playerClasses.warrior.description} 
    <br>> paladin: ${playerClasses.paladin.description} 
    <br>> adventurer: ${playerClasses.adventurer.description} 
    <br>> irishman: ${playerClasses.irishman.description}`);
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
        healthpool.innerHTML = 'You died!';
        // location.replace gevonden op https://www.tutorialspoint.com/How-to-redirect-to-another-webpage-using-JavaScript
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

    //update inventory
    if (player.items.length > 0) {
        playerInventory.innerHTML = '';
        for (let i = 0; i < player.items.length; i++) {
            playerInventory.innerHTML += '<br>> ' + player.items[i];
        }
    }
}

function phaseOne() {
    firstChoice();
}


function firstChoice() {
    let choice = playerInput.value.toLowerCase();
    console.log('choice:'+choice);
    if (choice.includes('left')) {
        killPlayer();
        addText(`I jump down the cliff. I land head first on a rock and die.`);
        // todo herstart
        return;
    }
    if (choice.includes('right')) {
        addText('I follow the pathway. After a while I arrive at a crossroads.');
        //changeLocation
        imgEnvironnement.src = crossRoads.img;
        // secondChoice();
        addText(`<br>4 options present themselves: 
        <br>> beast: A hungry beast. Maybe I can sneak past it. 
        <br>> river: A poisonous river. I can see a sloop, though it does not look very sturdy. 
        <br>> cliff: A steep cliff. There is a bridge, but it looks like it might break if I try to cross it. 
        <br>> desert: A seemingly endless desert. I don\'t see any enemies, but I probably don\'t have any water on me ....`);
        afterChoice1 = true;
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

function killPlayer(){
    player.health = -1;
    updateStats();
}

function secondChoice() {
        choice = playerInput.value.toLowerCase();
        console.log(choice);
        addText(`<br> > ${choice} `);
        if (choice.includes('beast')) {
            addText('<br>I try to sneak past the beast. It sees me and attacks me. I die. ');
            killPlayer(); // kill the player
        }
        else if (choice.includes('river')) {
            addText('<br>I enter the sloop and begin the row. It\'s not very sturdy, so the poisonous fluid quickly fills the bottom of the boat. I survive but am not doing well ... You took some damage');
            player.health -= player.health/2; // removes 1/2 of the player HP
            updateStats();
            proceedToUrban = true;

        } 
        else if (choice.includes('cliff')) {
            addText('<br>I try to cross the bridge. It breaks as soon as I set foot on land. I stumble from shock and hurt my big toe. You took some damage.');
            player.health -= player.health/8; // removes 1/8 of the player HP
            updateStats();
            proceedToUrban = true;

        }
        else if (choice.includes('desert')) {
            addText('<br>I try to cross the desert. I get thirsty a lot earlier than expected. I surive by the skin of my teeth. You took some damage');
            player.health -= player.health/4; // removes 1/4 of the player HP
            updateStats();
            proceedToUrban = true;
        }
        updateStats();
            
        // display random new location
        console.log(urbanDestinations);
        const randomLocation = urbanDestinationsAr[Math.floor(Math.random() * (urbanDestinationsAr.length - 1))];
        console.log(randomLocation);
        const urbanLoc = urbanDestinations[randomLocation];
        console.log(urbanLoc);
        imgEnvironnement.src = urbanLoc.img;
        currentLocation.innerHTML = urbanLoc.name;
        addText(urbanLoc.description);
        playerInput.value = '';
        afterChoice2 = true;
};

function thirdChoice() {
    addText(`<br>I feel a cold hand on my shoulder: "I have never seen you around here, traveler", an old woman with a mysterious aura says to me. 
    <br>>>"I can help you on your quest when you obtain 3 items. Only you know which items you seek. I left a gift for you at the big tree in the town square. Have a rest at my place to regain some health. Trust me you will need it."
    <br> Even though she gives off some weird vibes, I really need the rest. So I follow her back to her hut
    <br> *after a restfull night you wake up refreshed (+ 50hp), you grab a snack, but the stranger is no where to be found*`);

    // initiate challange 1
    currentLocation.innerHTML = 'Challenge 1: Sudoku';
    imgEnvironnement.src = 'img/sudoku.png';
    addText(`<br> the next Mysterious helper you meet says: 
    <br>>>"Sorry mijn English is not ferry goed, dus ik spiek in Nederlands. Vind het magische woord aan de hand van de missende nummers en je zal rijkelijk beloond worden.
    <br> Vul de nummers in van links naar rechts, en van boven naar benede. 
    <br> +-----------------------------------+
    <br> | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
    <br> +-----------------------------------+
    <br> | A | B | C | D | E | F | G | H | I |
    <br> +-----------------------------------+`);
    afterChoice3 = true;
}

function firstChallengePart1() {
    choice = playerInput.value.toLowerCase();
    if (challenge1TryCounter == 1) {
        challenge1Solved = true;
    addText('<br>ERROR: puzzle bypassed by too low intellingence');
    return;
    }
    if (choice.toLowerCase() == 'dead') {
        challenge1Solved = true;
    }
    if (playerInput.value.toLowerCase() != 'dead'){
        challenge1TryCounter--;
        addText('<br> Wrong! Please try again.');
        addText(`you have ${challenge1TryCounter} tries left`)
    }
}

function firstChallengePart2() {
    addText(`<br>>>"Your reward is: a ${giveReward()}"`);
    afterchallenge1 = true;
    //initiate challenge 2
    currentLocation.innerHTML = 'Challenge 2: The Spanish Test';
    addText(`<br> After completing the previous challenge, I am aproached by a jovial looking man with an enormous sombrero; so big that it totally covers his face.`);
    addText(`<br> >>"Hola amigo. I have a challenge for you. Don\'t worry, it\'s not too hard. Tell me how many tries it took you to complete the previous challenge - in Spanish of course. If you failed to solve it, tell me what "six" is in Spanish. Vamos!"`);
}

function secondChallengePart1(){
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
        addText('<br>>>AY CARAMBA! puzzle bypassed by too low intellingence');
        return;
    }
    if (playerInput.value.toLowerCase() != answer){
        challenge2TryCounter--;
        addText('<br>>>Equivocado! Please try again.');
        addText(`You have ${challenge2TryCounter} tries left`)
        return;
    }
}

function secondChallengePart2() {
    addText('<br>Great job! You have solved the puzzle!');
    addText(`<br>>>"You passed my challenge, your reward is a ${giveReward()}"`);
    afterchallenge2Part2 = true;
    // intiate challenge 3
    currentLocation.innerHTML = 'Challenge 3: The German Jigsaw';
    addText(`<br>You are aproached by an odd looking fellow wearing lederhosen. He reeks of beer and sauerkraut. He says:
    <br>>>"Gutentag mein Freund. I need your help. I am very hungover and can\'t concentrate. I absolutely need to solve this puzzle. Can you do it for me? I will reward you handsomely. Combine all the letters into a word, and tell me what it is.`);
    imgEnvironnement.src = 'img/jigsaw.png';
}

function giveReward(){
    const reward = items[Math.floor(Math.random() * (items.length - 1))];
    items.splice(items.indexOf(reward), 1);
    player.items.push(reward);
    updateStats();
    return reward;
}

function thirdChallengePart1(){
    let answer = 'sagen!';
    choice = playerInput.value.toLowerCase();
    if (choice == answer) {
        challenge3Solved = true;
        return;
    }
    if (challenge3TryCounter == 1) {
        challenge3Solved = true;
        addText('<br>>>Das war nicht gut ... Here is your reward anyway. The word was "sagen!"');
        return;
    }
    if (choice != answer){
        challenge3TryCounter--;
        addText('<br>>>Falsch! Please try again.');
        addText(`you have ${challenge3TryCounter} tries left`)
        return;
    }
}

function thirdChallengePart2() {
    addText(`<br>You passed the test, your reward is ${giveReward()}`)
    afterchallenge3 = true;
    currentLocation.innerHTML = 'The old woman\'s hut';
    imgEnvironnement.src = 'img/hut.webp';
    addText(`<br>I head back to the old woman\'s hut. I knock on the door, but no one answers. I knock a second time. No answer. Luckily the door is not very sturdy. I take my ${player.shield} and bash the door in. As soon as I do that, she magically appears in front of me, surrounded by a dark aura.
    <br>"Congratulations traveler. I did\'t think you would make it this far. Let me help you on your quest." <br>She starts speaking an ancient language, and I start to feel a little dizzy. My conciousness starts to fade, but before that happens I come back to my senses. I have never felt this good. 
    <br>"I cast a spell on you. You will now be able to defeat your final foe, and go home. Good luck!"
    <br>She disappears in a puff of smoke.`);
}

function witchEncounter(){
    // apply buffs to player
    player.health += 30;
    player.strength += 10;
    player.defense += 10;
    player.items = [];
    updateStats();
    selectBoss();
    console.log('boss' + {boss});
    addText(`Now feeling very strong and refreshed, I continue on my path. Suddenly, while walking through a ${boss.environment}, 
    ${randomBossPreposition} ${boss.name}appears before me.`);
    currentLocation.innerHTML = `${boss.environment}`;
    imgEnvironnement.src = boss.img;
    healthBar.classList.remove('hidden');
    healthBar.innerHTML += ' ' + boss.health;
    afterWitchEncounter = true;

    updateBossHealth();
}

function selectBoss(){
    boss = beasts[beastsAr[Math.floor(Math.random() * beastsAr.length)]];
}

function bossEncounter() {
    addText(`<br>Adrenaline rushes through my veins. I am ready to fight. I take out my ${player.weapon} and ${player.shield} and prepare for battle.`);
    afterBossPart1 = true;
}

function endGame() {
    location.replace('eindscherm.html');
}


function playerTurn() {
    if (player.health == 0 || player.health < 0) {
        addText('<br>i feel a sharp pain. i look down to see my legs lying on the floor 10 metres in front of me');
        addText(`The last thing i see before i pass out is my enemy, smiling at me.`);
        return;
    }
    addText(`<br> I swing my sword at the enemy...`);
    const damage = outgoingDamage();
    if (critSuccess == true) {
        addText(`<br>CRITICAL HIT!!! I hit the boss for ${damage} damage`);
    }
    if (critSuccess == false) {
        addText(`<br>HIT! I attack the boss for ${damage} damage`);
    }
    boss.health -= damage;
    updateBossHealth();
}

function bossTurn() {
    if (boss.health == 0 || boss.health < 0) {
        addText(`<br> The boss roars loadly as he falls to the ground. The ${randomBossPreposition} ${boss.name} is dead!`);
        return;}
    addText(`<br> The ${randomBossPreposition} ${boss.name} attacks you...`);
    if (bossMissed == true) {
        addText(`<br>!!!The ${randomBossPreposition} ${boss.name} MISSED!!!`);
    }
    if (bossMissed == false) {
        addText(`<br>The boss hits you for ${incDamage} damage`);
    }
}

//scrollToBottom gebruikt van https://gist.github.com/sabapathygithub/e6ca2c0fd06c21c5fb608b9a172ca3c4
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

function updateBossHealth(){
    //healthBar.innerHTML = boss.health;
    
    const healthPercentage = boss.health + '%';
    healthBar.innerHTML = `<div class="health" style="width: ${healthPercentage}"></div>` + randomBossPreposition + ' ' +  boss.name + ' ' + boss.health; // bron chatgpt
    healthBar.style.display = 'block';
}