/* 

Prototype Refactor

1. Copy and paste your code or the solution from yesterday

2. Your goal is to refactor all of this code to use ES6 Classes. The console.log() statements should still return what is expected of them.

*/
/*
function GameObject(attr) {
    this.createdAt = attr.createdAt;
    this.name = attr.name;
    this.dimensions = attr.dimensions;
}
GameObject.prototype.destroy = function() {
    return ' ${this.name} was removed from the game.';
}
*******************GAME OBJECT***********************/
class GameObject {
    //notice that class declaration does not have parenthesis.
    constructor(attr) {
        this.createdAt = attr.createdAt;
        this.name = attr.name;
        this.dimensions = attr.dimensions;
    }
    destroy() {
        return `${this.name} was removed from the game.`;
    }
}
/*
  === CharacterStats ===

function CharacterStats(charStats) {
    this.healthPoints = charStats.healthPoints;
    GameObject.call(this, charStats);
}
CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function() {
    return '${this.name} took damage.';
}
++++++++++CHARACTER STATS++++++++++++*/
class CharacterStats extends GameObject { //'extends' sets the inheritance
    //notice that class declaration does not have parenthesis.
    constructor(charStats) {
        super(charStats); // 'super' this calls the parent constructor and sets the parent properties on the inheriting child
        this.healthPoints = charStats.healthPoints; // this is only on the child
    }
    takeDamage = function() { //all funcitons in clas are placed in the prototype
        return `${this.name} took damage.`;
    }
}

/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===

function Humanoid(human) {
    CharacterStats.call(this, human);
    this.team = human.team;
    this.weapons = human.weapons;
    this.language = human.language;
}
Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
    return `${this.name} offers a greeting in ${this.language}.`;
};
+++++++++++++++HUMANOID+++++++++++*/

class Humanoid extends CharacterStats { //extends- sets where I'm inheriting from
    constructor(human) {
        super(human); //this is where parent values are brought into the child
        this.team = human.team;
        this.weapons = human.weapons;
        this.language = human.language;
    }
    greet = function() { // this is on the prototype of Humanoid and not on the parent
        return `${this.name} offers a greeting in ${this.language}.`;
    };
}

/*
 * Inheritance chain: GameObject -> CharacterStats -> Humanoid
 *
 */

// Test you work by un-commenting these 3 objects and the list of console logs below:

//
const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 1,
        height: 1,
    },
    healthPoints: 5,
    name: 'Bruce',
    team: 'Mage Guild',
    weapons: [
        'Staff of Shamalama',
    ],
    language: 'Common Tongue',
});

const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 2,
        width: 2,
        height: 2,
    },
    healthPoints: 15,
    name: 'Sir Mustachio',
    team: 'The Round Table',
    weapons: [
        'Giant Sword',
        'Shield',
    ],
    language: 'Common Tongue',
});

const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
        length: 1,
        width: 2,
        height: 4,
    },
    healthPoints: 10,
    name: 'Lilith',
    team: 'Forest Kingdom',
    weapons: [
        'Bow',
        'Dagger',
    ],
    language: 'Elvish',
});

console.log(mage.createdAt); // Today's date
console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
console.log(swordsman.healthPoints); // 15
console.log(mage.name); // Bruce
console.log(swordsman.team); // The Round Table
console.log(mage.weapons); // Staff of Shamalama
console.log(archer.language); // Elvish
console.log(archer.greet()); // Lilith offers a greeting in Elvish.
console.log(mage.takeDamage()); // Bruce took damage.
console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.
//

// Stretch task: 
// * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function. 

//villain constructor
class Villain extends Humanoid {
    constructor(badDudes) {
        super(badDudes); //this is where parent values are brought into the child
        this.team = badDudes.team;
        this.weapons = badDudes.weapons;
        this.language = badDudes.language;
    }
    bowAttack = function(victim) {
        victim.healthPoints = victim.healthPoints - 4;
    };
}
class Hero extends Humanoid {
    constructor(goodDudes) {
        super(goodDudes); //this is where parent values are brought into the child
        this.team = goodDudes.team;
        this.weapons = goodDudes.weapons;
        this.language = goodDudes.language;
    }
    spearAttack = function(victim) {
        victim.healthPoints = victim.healthPoints - 7;
    };
}
//end of villain constructor
const sniper = new Villain({
    createdAt: new Date(),
    dimensions: {
        length: 1,
        width: 2,
        height: 4,
    },
    healthPoints: 10,
    name: 'BadGuy',
    team: 'Team Evil',
    weapons: [
        'Bow',
        'Dagger',
    ],
    language: 'Common',
});

const footman = new Hero({
    createdAt: new Date(),
    dimensions: {
        length: 1,
        width: 2,
        height: 4,
    },
    healthPoints: 10,
    name: 'GoodFellas',
    team: 'Team Goodies',
    weapons: [
        'Spear',
        'Shield',
    ],
    language: 'Common',
});


// * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;

// * Create two new objects, one a villain and one a hero and fight it out with methods!

sniper.bowAttack(footman);
footman.spearAttack(sniper);
console.log(`${sniper.name} current health ${sniper.healthPoints}`);