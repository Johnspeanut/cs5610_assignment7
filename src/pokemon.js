const { response } = require('express');
const express = require('express');
const router = express.Router();
const { v4: uuid } = require('uuid');

// replace this string with your full name
const name = "Qiong Peng"

console.log(`My name is ${name}`)

// use this list as your temporary database!
// note that it will reset every time you restart your server
let myPokemon = [{
    id: "fc10b559-872c-43cd-bad2-f02e2e0a2d58", name: "Pikachu", health: 10, level: 1
}];

router.get('/', function (req, res) {
    // return all pokemon
    return res.status(200).send(myPokemon);
});

router.post('/', (req, res) => {
    // if the pokemon name already exists in the list, return an error
    // randomly generate an id using UUID ["uuid()"]
    // randomly generate a level between 1 and 10, inclusive, if none is given
    // randomly generate a health between 10 and 100, inclusive, if none is given
    // insert your pokemon into the myPokemon list
    // return a 200
    const newId = uuid();
    const newHealth = Math.floor(Math.random() * (100 - 10 + 1)) + 10;  // Math.floor(Math.random() * (max - min + 1) ) + min;
    const newLevel = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    const newName = req.body.name;
    if (!name) {
        return res.status(404).send("The name you enter is incorrect!");
    } else {
        let found = false;
        for (let i = 0; i < myPokemon.length; i++) {
            if (myPokemon[i].name === newName) {
                found = true;
                return res.status(404).send("The name you enter is already in the database.")
            }
        }
    }
    const newPokemon = {
        id: newId, name: newName, health: newHealth, level: newLevel
    }
    myPokemon.push(newPokemon);
    return res.status(200).send(newPokemon + " posted successfully.");

});

router.get('/:pokemonId', function (req, res) {
    // return pokemon if one is found matching the pokemonId
    // return a 404 if no pokemon matches that pokemonId
    const pokemonid = req.params.pokemonId;

    for (let i = 0; i < myPokemon.length; i++) {
        if (myPokemon[i].id === pokemonid) {
            return res.status(200).send(myPokemon[i]);
        }
    }
    return res.status(404).send("No pokemon found with " + pokemonid);

});

router.put('/:pokemonId', function (req, res) {
    // update the pokemon matching the pokemonId
    // based on the req body
    // return a 404 if no pokemon matches that pokemonId 
    const pokemonid = req.params.pokemonId;
    const name = req.body.name;
    const health = req.body.health;
    const level = req.body.level;
    for (let i = 0; i < myPokemon.length; i++) {
        if (myPokemon[i].id === pokemonid) {
            if (name) {
                myPokemon[i].name = name;
            }
            if (health) {
                myPokemon[i].health = parseInt(health);
            }
            if (level) {
                myPokemon[i].level = parseInt(level);
            }
            return res.status(200).send(name);
        }
    }
    return res.status(404).send("no pokemon matches that pokemonId");
})

router.delete('/:pokemonId', function (req, res) {
    // delete pokemon if pokemonId matches the id of one
    // return 200 even if no pokemon matches that Id
    const pokemonid = req.params.pokemonId;
    if (pokemonid) {
        for (let i = 0; i < myPokemon.length; i++) {
            if (myPokemon[i].id === pokemonid) {
                myPokemon = myPokemon.filter(function (element) {
                    return element.id !== pokemonid;
                });
                return res.status(200).send("Delete successully " + pokemonid);
            }
        }
    }

    return res.send("The id you input doesnot match one in our database");

})

module.exports = router;