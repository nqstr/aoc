#!/usr/bin/env node

let fs = require('fs');

let nums = fs.readFileSync('./input-day10.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => parseInt(e, 10));

nums.push(0);
nums = nums.sort((a, b) => a - b);
nums.push(nums[nums.length - 1] + 3);

let oneJoils = 0;
let theeJoils = 0;
for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === 1) {
        oneJoils++;
    }
    if (nums[i] - nums[i - 1] === 3) {
        theeJoils++
    }
}

console.log(`result: ${oneJoils * theeJoils}`);
