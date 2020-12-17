#!/usr/bin/env node

let fs = require('fs');

let input = fs.readFileSync('./input-day13.txt', 'utf-8')
    .split('\n')
    .filter(e => e);

const depart = parseInt(input[0], 10);
const result = input[1].split(',')
    .filter(e => e !== 'x')
    .map(e => parseInt(e, 10))
    .map(b => {
        return {bus: b, t: b - (depart % b)}
    })
    .sort((a, b) => a.t - b.t)
    .slice(0, 1)
    .map(b => b.t * b.bus);

console.log(`result: ${result}`)
