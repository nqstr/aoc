#!/usr/bin/env node

let fs = require('fs');

let bags = fs.readFileSync('./input-day7.txt', 'utf-8')
    .split('\n')
    .filter(e => e)
    .filter(e => e.indexOf('no other bags') === -1)
    .map(e => {
        let parts = e.split(' bags contain ');
        return {
            container: parts[0],
            content: parts[1].replaceAll(/bags?|\d+\s|\./g, '')
                .split(', ')
                .map(e => e.trim())
        };
    })
    .reduce((result, e) => {
        result[e.container] = e.content;
        return result;
    }, {});

let result = 0;

for (let bag in bags) {
    result += search(bag, bags[bag], 'shiny gold') ? 1 : 0;
}

function search(container, content, target) {
    if (container === target) {
        return true;
    }
    let found = false;
    for (let i = 0; i < content.length; i++) {
        if (bags[content[i]]) {
            found |= search(content[i], bags[content[i]], target);
        }
    }
    return found;
}

console.log(result - 1);
