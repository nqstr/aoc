#!/usr/bin/env node

let fs = require("fs");
const tree = '#';
const map = fs.readFileSync("./input-day3.txt", "utf-8")
    .split("\n")
    .filter(e => e.length > 0)
    .map(e => e.split(""));

function walkDown(aMap, right, down) {
    let trees = 0;
    let xCoordinate = 0;
    for (let i = 0; i < map.length; i += down) {
        if (map[i][xCoordinate] === tree) {
            trees++;
        }
        xCoordinate = (xCoordinate + right) % map[i].length;
    }
    return trees;
}

console.log(
    walkDown(map, 1, 1) *
    walkDown(map, 3, 1) *
    walkDown(map, 5, 1) *
    walkDown(map, 7, 1) *
    walkDown(map, 1, 2)
);
