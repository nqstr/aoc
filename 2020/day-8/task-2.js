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

function calculate(operations) {
    let idx = 0;
    let result = 0;
    while (true) {
        let op = operations[idx];
        if (idx === operations.length) {
            return result;
        }
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
    return NaN;
}

for (let i = 0; i < ops.length; i++) {
    if (ops[i].op !== 'acc') {
        ops[i].op = ops[i].op === 'jmp' ? 'nop' : 'jmp';
    } else {
        continue;
    }
    let result = calculate(ops);
    if (!isNaN(result)) {
        console.log(`the answer is ${result}`);
        return;
    }
    // restore
    ops.forEach(e => e.passed = false);
    ops[i].op = ops[i].op === 'jmp' ? 'nop' : 'jmp';
}
