#!/usr/bin/env node

let fs = require('fs');

let result = {};

fs.readFileSync('./input-day14.txt', 'utf-8')
    .split('\nmask = ')
    .map(e => e.split('\n'))
    .map(e => {
        return {
            mask: e[0].replaceAll('mask = ', ''),
            mem: e.slice(1).filter(e => e).map(e => e.replace('mem[', '').split('] = ')
                .reduce((ac, v, i) => {
                    if (i === 0) {
                        ac['adr'] = parseInt(v);
                    } else {
                        ac['val'] = parseInt(v);
                    }
                    return ac;
                }, {}))
        }
    }).forEach(e => {
        let mask = e.mask;
        e.mem.forEach(m => {
            let masks = [];
            variants(mask, masks);
            masks.forEach(msk => {
                let adr = parseInt(applyMask(
                    zerofill((m.adr >>> 0).toString(2).split(''), 36),
                    msk,
                    mask.split('')
                ).join(''), 2);
                result[adr] = m.val;
            });
        })
    });

function zerofill(arr, length) {
    if (arr.length < length) {
        let deltaArr = new Array(length - arr.length);
        deltaArr.fill(0);
        return [...deltaArr, ...arr];
    }
    return arr;
}

function applyMask(num, mask, parentMask) {
    for (let i = 0; i < parentMask.length; i++) {
        switch (parentMask[i]) {
            case '1':
                num[i] = '1';
                break;
            case 'X':
                num[i] = mask[i];
        }
    }
    return num;
}

function variants(mask, acc) {
    if (mask.indexOf('X') === -1) {
        acc.push(mask);
        return;
    }
    variants(mask.replace('X', '1'), acc);
    variants(mask.replace('X', '0'), acc);
}

console.log(`result: ${Object.values(result).reduce((a, b) => a + b)}`)
