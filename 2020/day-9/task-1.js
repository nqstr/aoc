#!/usr/bin/env node

let fs = require('fs');

let nums = fs.readFileSync('./input-day9.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => parseInt(e, 10));
const preamble = 25;
for (let i = preamble; i < nums.length; i++) {
    if (!isSumOfTwo(nums[i], nums.slice(i - preamble, i))) {
        console.log(`result ${nums[i]}`);
        break;
    }
}

function isSumOfTwo(num, arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === num) {
                return true;
            }
        }
    }
    return false;
}
