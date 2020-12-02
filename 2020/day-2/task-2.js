#!/usr/bin/env node

let fs = require("fs");

const result = fs.readFileSync("./input-day2.txt", "utf-8")
    .split('\n')
    .filter(e => e.length > 0)
    .map(e => {
        const arr = e.split(" ");
        const limits = arr[0].split("-");
        return {
            first: parseInt(limits[0]),
            second: parseInt(limits[1]),
            symbol: arr[1].replace(':', ''),
            pass: arr[2]
        }
    })
    .filter(e => {
        const charsArray = e.pass.split('');
        return charsArray[e.first - 1] === e.symbol ^ charsArray[e.second - 1] === e.symbol;
    }).length;

console.log(result);