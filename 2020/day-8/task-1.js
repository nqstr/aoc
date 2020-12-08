#!/usr/bin/env node

let fs = require('fs');

let ops = fs.readFileSync('./input-day8.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .map(e => {
        let parts = e.split(' ');
        return {
            op: parts[0],
            val: parts[1],
            passed: false
        };
    });

let idx = 0;
let result = 0;
while (true) {
    let op = ops[idx];
    if (op.passed) {
        break;
    }
    op.passed = true;
    switch (op.op) {
        case 'nop':
            idx++;
            break;
        case 'acc':
            idx++;
            result += parseInt(op.val, 10);
            break;
        case 'jmp':
            idx += parseInt(op.val, 10);
            break;
    }
}

console.log(result);
