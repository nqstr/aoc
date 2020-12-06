#!/usr/bin/env node

let fs = require("fs");

const input = fs.readFileSync("./input-day6.txt", "utf-8")
    .split("\n");

let sum = 0;
let set = new Set();
for (let i = 0; i < input.length; i++) {
    let line = input[i];
    if (line === '') {
        sum += set.size;
        set.clear();
    }
    line.split('').forEach(v => set.add(v));
}

console.log(`result ${sum}`);
