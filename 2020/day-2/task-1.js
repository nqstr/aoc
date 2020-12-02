#!/usr/bin/env node

let fs = require("fs");

const result = fs.readFileSync("./input-day2.txt", "utf-8")
    .split("\n")
    .filter(e => e.length > 0)
    .map(e => {
        const tokens = e.split(" ");
        const limits = tokens[0].split("-");
        return {
            min: parseInt(limits[0]),
            max: parseInt(limits[1]),
            symbol: tokens[1].replace(':', ''),
            pass: tokens[2]
        }
    })
    .filter(e => {
        const initialLength = e.pass.length;
        const resultLength = e.pass.replaceAll(e.symbol, '').length;
        const delta = initialLength - resultLength;
        return delta >= e.min && delta <= e.max;
    }).length;

console.log(result);