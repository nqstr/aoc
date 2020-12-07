#!/usr/bin/env node

let fs = require('fs');

let bags = fs.readFileSync('./input-day7.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    // .filter(e => e.indexOf('no other bags') === -1)
    .map(e => {
        let parts = e.split(' bags contain ');
        let content = parts[1].replaceAll(/bags?|\./g, '')
            .split(', ')
            .map(e => e.trim())
            .map(e => e)
            .map(
                e => {
                    return {
                        bag: e.replaceAll(/\d+\s/g, ''),
                        amount: parseInt(e, 10)
                    };
                }
            );
        return {
            container: parts[0],
            content: content
        };
    })
    .reduce((result, e) => {
        result[e.container] = e.content;
        return result;
    }, {});

function count(innerBags) {
    let total = 1;
    for (let i = 0; i < innerBags.length; i++) {
        let innerBag = innerBags[i];
        if (bags[innerBag.bag]) {
            total += (innerBag.amount * count(bags[innerBag.bag]));
        }
    }
    return total;
}

console.log(count(bags['shiny gold']) - 1);
