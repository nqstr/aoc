#!/usr/bin/env node

let fs = require("fs");
const fields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];

const passports = fs.readFileSync("./input-day4.txt", "utf-8")
    .split("\n");
let count = 0;
let passport = '';
for (let i = 0; i < passports.length; i++) {
    if (passports[i] === '') {
        if (check(passport)) {
            count++;
        }
        passport = '';
    }
    passport += ' ' + passports[i];
}

function check(pass) {
    let pas = pass.split(' ')
        .filter(e => e.length > 1)
        .map(e => e.split(':')[0])
        .map(e => e.trim());
    for (let j = 0; j < fields.length; j++) {
        let field = fields[j];
        if (!pas.includes(field) && field !== 'cid') {
            return false;
        }
    }
    return true;
}

console.log(count);
