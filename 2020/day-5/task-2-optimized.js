#!/usr/bin/env node

let fs = require("fs");

const boardingPasses = fs.readFileSync("./input-day5.txt", "utf-8")
    .split("\n")
    .filter(e => e.length > 1)
    .map(e => e.replaceAll('R', 'B'))
    .map(e => seat(e))
    .map(e => parseInt(e, 10))
    .sort((a, b) => a - b);

function seat(boardingPas) {
    return decode(boardingPas.slice(0, 7).split(''), 0, 127, 0) * 8 +
        decode(boardingPas.slice(7, 10).split(''), 0, 7, 0);
}

function decode(charArray, position, high, low) {
    if (position === charArray.length - 1) {
        return charArray[position] === 'B' ? high : low;
    }
    if (charArray[position] === 'B') {
        low = Math.round((high + low) / 2);
        return decode(charArray, position + 1, high, low);
    } else {
        high = Math.floor((high + low) / 2);
        return decode(charArray, position + 1, high, low);
    }
}

let min = boardingPasses[0];
let max = boardingPasses[boardingPasses.length - 1];
const sumMin = (min - 1) * (min) / 2;
const sumMax = (max) * (max + 1) / 2;

console.log(`missing seat: ${sumMax - sumMin - boardingPasses.reduce((a, b) => a + b)}`);
