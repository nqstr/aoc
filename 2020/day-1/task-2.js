#!/usr/bin/env node

let fs = require("fs");

let nums = fs.readFileSync("./input-day1.txt", "utf-8")
    .split("\n")
    .map(n => parseInt(n));

done:
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = 1; j < nums.length - 1; j++) {
            for (let k = 2; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] === 2020) {
                    console.log(nums[i] * nums[j] * nums[k]);
                    console.log(nums[i] + " and " + nums[j] + " and " + nums[k]);
                    break done;
                }
            }
        }
    }
