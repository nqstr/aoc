#!/usr/bin/env node

let fs = require('fs');

let nums = fs.readFileSync('./input-day10.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => parseInt(e, 10));

nums.push(0);
nums = nums.sort((a, b) => a - b);
nums.push(nums[nums.length - 1] + 3);

let paths = new Array(nums.length);
paths.fill(0);

function find(arr, idx) {
    console.log(idx);
    if (idx === 0) {
        return 1;
    }
    if (paths[idx] !== 0) {
        return paths[idx];
    }
    let count = 0
    for (let i = idx - 1; i >= idx - 3; i--) {
        console.log(`${idx} vs ${i}`);
        if (arr[idx] - arr[i] < 4) {
            count += find(arr, i)
        }
    }
    paths[idx] = count;
    return count;
}

console.log(`result: ${find(nums, nums.length - 1)}`);
