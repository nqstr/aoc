#!/usr/bin/env node

let fs = require('fs');

let seats = fs.readFileSync('./input-day11.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => e.split(''));
const free = 'L';
const busy = '#';

function neighbours(i, j, arr) {
    let count = 0;
    for (let k = j + 1; k < arr[i].length; k++) {
        if (arr[i][k] === busy) {
            count++;
            break;
        }
        if (arr[i][k] === free) {
            break;
        }
    }
    for (let k = j - 1; k >= 0; k--) {
        if (arr[i][k] === busy) {
            count++;
            break;
        }
        if (arr[i][k] === free) {
            break;
        }
    }
    for (let k = i + 1; k < arr.length; k++) {
        if (arr[k][j] === busy) {
            count++;
            break;
        }
        if (arr[k][j] === free) {
            break;
        }
    }
    for (let k = i - 1; k >= 0; k--) {
        if (arr[k][j] === busy) {
            count++;
            break;
        }
        if (arr[k][j] === free) {
            break;
        }
    }
    for (let k = i - 1, l = j - 1; k >= 0 && l >= 0; k--, l--) {
        if (arr[k][l] === busy) {
            count++;
            break;
        }
        if (arr[k][l] === free) {
            break;
        }
    }
    for (let k = i - 1, l = j + 1; k >= 0 && l < arr[i].length; k--, l++) {
        if (arr[k][l] === busy) {
            count++;
            break;
        }
        if (arr[k][l] === free) {
            break;
        }
    }
    for (let k = i + 1, l = j + 1; k < arr.length && l < arr[i].length; k++, l++) {
        if (arr[k][l] === busy) {
            count++;
            break;
        }
        if (arr[k][l] === free) {
            break;
        }
    }
    for (let k = i + 1, l = j - 1; k < arr.length && l >= 0; k++, l--) {
        if (arr[k][l] === busy) {
            count++;
            break;
        }
        if (arr[k][l] === free) {
            break;
        }
    }
    return count;
}

function round(arr) {
    let result = JSON.parse(JSON.stringify(arr));
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let seat = arr[i][j];
            if (seat === free && neighbours(i, j, arr, false) === 0) {
                result[i][j] = busy;
            }
            if (seat === busy && neighbours(i, j, arr, true) >= 5) {
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
