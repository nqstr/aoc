#!/usr/bin/env node

let fs = require('fs');

let input = fs.readFileSync('./input-day19.txt', 'utf-8')
    .split('\n\n');

let rules = input[0].split('\n').filter(e => e).map(e => {
    let parts = e.split(':');
    let rulesArr = parts[1].trim().split(' ');
    return {
        idx: parseInt(parts[0]),
        rule: rulesArr.length === 1 ? rulesArr[0] : rulesArr
    }
}).reduce((acc, v) => {
    acc[v.idx] = v.rule;
    return acc;
}, {});
let signals = input[1].split('\n').filter(e => e);

let lookup = {};

function buildRule(rule) {
    if (lookup[rule]) {
        return lookup[rule];
    }
    if (Array.isArray(rule)) {
        return `(${rule.map(r => buildRule(r)).join('')})`;
    }
    if (isNaN(rule)) {
        return rule.replaceAll('"', '');
    } else { // number
        let r = buildRule(rules[rule]);
        lookup[rule] = r;
        return r;
    }
}

let result = signals.map(s => new RegExp(`^${buildRule(rules[0])}$`).test(s)).filter(s => s).length;

console.log(`result: ${result}`)
