#!/usr/bin/env node

let fs = require('fs');

let seats = fs.readFileSync('./input-day11.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => e.split(''));
const free = 'L';
const busy = '#';

function neighbours(i, j, arr, occupied) {
    const start = Math.max(0, j - 1);
    const end = Math.min(arr[i].length, j + 2);
    let rowUp = i === 0 ? [] : arr[i - 1].slice(start, end);
    let row = arr[i].slice(start, end);
    let rowDown = i >= arr.length - 1 ? [] : arr[i + 1].slice(start, end);
    const occupiedCount = [...rowUp, ...row, ...rowDown].filter(e => e === busy).length;
    return occupied ? (occupiedCount - 1) : occupiedCount;
}


function round(arr) {
    let result = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let seat = arr[i][j];
            if (seat === free && neighbours(i, j, arr, false) === 0) {
                result[i][j] = busy;
            }
            if (seat === busy && neighbours(i, j, arr, true) >= 4) {
                result[i][j] = free;
            }
        }
    }
    return result;
}

while (true) {
    let r1 = round(seats);
    if (JSON.stringify(r1) === JSON.stringify(seats)) {
        console.log(`result: ${seats.flat().filter(e => e === busy).length}`);
        break;
    }
    seats = r1;
}
