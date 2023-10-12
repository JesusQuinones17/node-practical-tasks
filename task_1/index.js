const repl = require('repl');

repl.start();

const nodeVersion = process.versions.node;

const local = repl.start('$');
console.log("index.js running from node.js version: ", nodeVersion);

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

module.exports = getRandomNumber();

const randomNumber = getRandomNumber();
console.log(randomNumber);