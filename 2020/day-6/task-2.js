#!/usr/bin/env node

let fs = require("fs");

const input = fs.readFileSync("./input-day6.txt", "utf-8")
    .split("\n");

let sum = 0;
let group = [];
for (let i = 0; i < input.length; i++) {
    let line = input[i];
    if (line === '') {
        sum += intersect(group).length;
        group = [];
        continue;
    }
    group.push(line.split(''));
}

function intersect(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = result.filter(v => arr[i].includes(v));
    }
    return result;
}

console.log(`result: ${sum}`);
