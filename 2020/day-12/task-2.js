#!/usr/bin/env node

let fs = require('fs');

let moves = fs.readFileSync('./input-day12.txt', 'utf-8')
    .split('\n')
    .filter(e => e);

let ship = {n: 0, e: 0, s: 0, w: 0};
let vector = {n: 1, e: 10, s: 0, w: 0}

function moveShip(to, from, move) {
    if (ship[to] !== 0) {
        ship[to] += move;
    } else {
        let delta = ship[from] - move;
        if (delta < 0) {
            ship[from] = 0;
            ship[to] += Math.abs(delta);
        } else {
            ship[from] -= move;
        }
    }
}

function rotateOnce(clockwise) {
    let n = vector.n, e = vector.e, s = vector.s, w = vector.w;
    if (clockwise) {
        vector.n = w;
        vector.e = n;
        vector.s = e;
        vector.w = s;
    } else {
        vector.n = e;
        vector.e = s;
        vector.s = w;
        vector.w = n;
    }
}

function rotate(val, clockwise) {
    let times = val / 90;
    for (let i = 0; i < times; i++) {
        rotateOnce(clockwise);
    }
}

function moveWP(to, from, val) {
    let delta = vector[from] - val;
    if (delta < 0) {
        vector[from] = 0;
        vector[to] += Math.abs(delta);
    } else {
        vector[from] -= val;
    }
}

for (let i = 0; i < moves.length; i++) {
    let step = moves[i];
    const dir = step.charAt(0);
    const val = parseInt(step.substr(1), 10);
    switch (dir) {
        case 'N':
            moveWP('n', 's', val);
            break;
        case 'S':
            moveWP('s', 'n', val);
            break;
        case 'E':
            moveWP('e', 'w', val);
            break;
        case 'W':
            moveWP('w', 'e', val);
            break;
        case 'L':
            rotate(val, false);
            break;
        case 'R':
            rotate(val, true);
            break;
        case 'F':
            for (let f in ship) {
                if (vector[f] !== 0) {
                    let step = vector[f] * val;
                    switch (f) {
                        case 'n':
                            moveShip('n', 's', step);
                            break;
                        case 's':
                            moveShip('s', 'n', step);
                            break;
                        case 'e':
                            moveShip('e', 'w', step);
                            break;
                        case 'w':
                            moveShip('w', 'e', step);
                            break;
                    }
                }
            }
            break;
    }
}

console.log(`result: ${ship.n + ship.e + ship.w + ship.s}`);
