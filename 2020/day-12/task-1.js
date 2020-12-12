#!/usr/bin/env node

let fs = require('fs');

let moves = fs.readFileSync('./input-day12.txt', 'utf-8')
    .split('\n')
    .filter(e => e);

let ship = {n: 0, e: 0, s: 0, w: 0, degree: 0};

function move(to, from, val) {
    let delta = ship[from] - val;
    if (delta < 0) {
        ship[from] = 0;
        ship[to] += Math.abs(delta);
    } else {
        ship[from] -= val;
    }
}

for (let i = 0; i < moves.length; i++) {
    let step = moves[i];
    const dir = step.charAt(0);
    const val = parseInt(step.substr(1), 10);
    switch (dir) {
        case 'N': {
            move('n', 's', val);
            break;
        }
        case 'S': {
            move('s', 'n', val);
            break;
        }
        case 'E': {
            move('e', 'w', val);
            break;
        }
        case 'W': {
            move('w', 'e', val);
            break;
        }
        case 'L': {
            let s = ship.degree - val;
            if (s < 0) {
                ship.degree = 360 - Math.abs(s);
            } else {
                ship.degree = s < 0 ? Math.abs(s) : s;
            }
            break;
        }
        case 'R': {
            let s = ship.degree + val;
            ship.degree = s >= 360 ? s - 360 : s;
            break;
        }
        case 'F': {
            switch (ship.degree) {
                case 0:
                    move('e', 'w', val);
                    break;
                case 90:
                    move('s', 'n', val);
                    break;
                case 180:
                    move('w', 'e', val);
                    break;
                case 270:
                    move('n', 's', val);
                    break;
            }
            break;
        }
    }
}

console.log(`result: ${ship.n + ship.e + ship.w + ship.s}`);
