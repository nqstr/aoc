#!/usr/bin/env node

let fs = require("fs");
const tree = '#';
const map = fs.readFileSync("./input-day3.txt", "utf-8")
    .split("\n")
    .filter(e => e.length > 0)
    .map(e => e.split(""));
let trees = 0;
let xCoordinate = 0;
for (let i = 0; i < map.length; i++) {
    if (map[i][xCoordinate] === tree) {
        trees++;
    }
    xCoordinate = (xCoordinate+3)%map[i].length;
}
console.log(trees);
