#!/usr/bin/env node

let fs = require("fs");

let nums = fs.readFileSync("./input-day1.txt", "utf-8")
	.split("\n")
	.map(n => parseInt(n));

done:
for (let i = 0; i < nums.length - 1; i++) {
    for (let j = 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === 2020) {
            console.log(nums[i] * nums[j]);
            console.log(nums[i] + " and " + nums[j]);
            break done;
        }
    }
}
