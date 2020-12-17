#!/usr/bin/env node

let fs = require('fs');

let input = fs.readFileSync('./input-day13.txt', 'utf-8')
    .split('\n')
    .filter(e => e);

let schedule = input[1].split(',').filter(e => e)
    .map((v, i) => {
        return {v: v === 'x' ? -1 : parseInt(v, 10), i: i}
    }).filter(e => e.v !== -1);
// schedule = [{'v': 17, 'i': 0}, {'v': 13, 'i': 2}, {'v': 19, 'i': 3}];
console.log(schedule);
let time = schedule[0].v;
let step = schedule[0].v;
schedule.slice(1).forEach( b => {
    for (let j = 0; ; j++) {
        let inc = step * j;
        if ((time + inc + b.i) % b.v === 0) {
            time += inc;
            step *= b.v;
            break;
        }
    }
});
console.log(`result: ${time}`)
