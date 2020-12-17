#!/usr/bin/env node

let fs = require('fs');

let result = {};

fs.readFileSync('./input-day14.txt', 'utf-8')
    .split('\nmask = ')
    .map(e => e.split('\n'))
    .map(e => {
        return {
            mask: e[0].replaceAll('mask = ', ''),
            mem: e.slice(1).filter(e => e)
        }
    }).forEach(e => {
        e.mem.map(e => e.split('] = '))
            .map(e => {return {adr: parseInt(e[0].replace('mem[', ''), 10), val: parseInt(e[1])}})
            .forEach(mem => {
                result[mem.adr] = parseInt(
                    applyMask(zerofill((mem.val >>> 0).toString(2).split(''), 36), e.mask.split('')).join(''),
                    2
                )
        })
});

function zerofill(arr, length) {
    let deltaArr = new Array(length - arr.length);
    deltaArr.fill(0);
    return [...deltaArr, ...arr];
}

function applyMask(num, mask) {
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] !== 'X') {
            num[i] = mask[i];
        }
    }
    return num;
}

console.log(`result: ${Object.values(result).reduce((a, b) => a + b)}`)
