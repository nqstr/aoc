#!/usr/bin/env node

let fs = require('fs');

let nums = fs.readFileSync('./input-day9.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => parseInt(e, 10));
const target = 104054607;

for (let i = 0; i < nums.length - 1; i++) {
    let sum = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
        sum += nums[j];
        if (sum === target) {
            let inner = nums.slice(i, j + 1).sort((a, b) => a - b);
            console.log(`result: ${inner[0] + inner[inner.length - 1]}`);
        }
    }
}
