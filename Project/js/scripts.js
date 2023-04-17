'use strict';

// define arrays with needed variables
const startLocations = ['Forest', 'Desert', 'Meadow', 'Swamp', 'Abandoned Ruins'];
const urbanDestinations = ['Medieval town', 'Steampunk city', 'Elven Land' ,'Dwarven village'];
const homeLocations = [''];
const playerClasses = ['Mage', 'Warrior', 'Assassin', 'Irishman', 'Adventurer'];
const beasts = {};
const npcUrban = [];
const npcMine = [];
const weapon = [];
const testshow = document.querySelector('#testshow');

const warrior = {
    name: 'warrior',
    description: 'a strong veteran that has won many battles',
    // 140 skillpoints to divide among stats
    intelligence: '10',
    strength: '80',
    luck: '20',
    speed: '30',
    weapons: ['sword', 'mace', 'greatsword'],
    shield: ['round shield', 'square shield', 'greatshield'],
}

const mage = {
    name: 'mage',
    description:'a wise hermit with great magical knowledge',
    // 140 skillpoints to divide among stats
    intelligence: '80',
    strength: '10',
    luck: '20',
    speed: '30',
    weapons: ['crystal staff', 'old wizards cane', 'magical sword'],
    shield: ['round shield', 'square shield', 'mystic shield'],
}

const assassin = {
    name: 'assassin',
    description: 'a cunning bandit that killed for gold',
    // 140 skillpoints to divide among stats
    intelligence: '20',
    strength: '30',
    luck: '10',
    speed: '80',
    weapons: ['bandits dagger', 'curved sword', 'club'],
    shield: ['round shield', 'square shield', 'bandits shield'],
}

const irishman = {
    name: 'irishman',
    description: 'a lucky irishman blessed by Saint Patrick',
    // 140 skillpoints to divide among stats
    intelligence: '10',
    strength: '30',
    luck: '80',
    speed: '20',
    weapons: ['sword', 'mace', 'spear'],
    shield: ['round shield', 'square shield', 'lucky clover shield'],
}

const adventurer = {
    name: 'adventurer',
    description: 'a daring, well rounded adventurer',
    // 140 skillpoints to divide among stats
    intelligence: '35',
    strength: '35',
    luck: '35',
    speed: '35',
    weapons: ['sword', 'mace', 'spear'],
    shield: ['round shield', 'square shield', 'adventurers shield'],
}

function randomChance() {
    const succes = false;
    const chanceInt = ((Math.round(Math.random * 100) + player.luck) / 2);
    if (chanceInt >= 100){succes = true}
    if (chanceInt < 100){succes = false}
}

const intTest = Math.round(Math.random() * (warrior.shield.length - 1))
console.log(intTest);
testshow.innerHTML = warrior.shield[intTest];
