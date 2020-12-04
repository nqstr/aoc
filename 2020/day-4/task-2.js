#!/usr/bin/env node

let fs = require("fs");

const passports = fs.readFileSync("./input-day4.txt", "utf-8")
    .split("\n");

let count = 0;
let passport = '';
for (let i = 0; i < passports.length; i++) {
    if (passports[i].trim() === '') {
        if (check(passport)) {
            count++;
        }
        passport = '';
    }
    passport += ' ' + passports[i];
}

function check(pass) {
    let pas = JSON.parse(
        '{"' +
        pass.trim()
            .replaceAll(' ', '","')
            .replaceAll(':', '":"') +
        '"}'
    );
    if (!inRange(parseInt(pas.byr, 10), 1920, 2002)) {
        return false;
    }
    if (!inRange(parseInt(pas.iyr, 10), 2010, 2020)) {
        return false;
    }
    if (!inRange(parseInt(pas.eyr, 10), 2020, 2030)) {
        return false;
    }
    if (!pas.hgt) {
        return false;
    }
    const dimension = pas.hgt.split(/\d+/)[1];
    if (dimension === 'cm') {
        if (!inRange(parseInt(pas.hgt, 10), 150, 193)) {
            return false;
        }
    } else if (dimension === 'in') {
        if (!inRange(parseInt(pas.hgt, 10), 59, 76)) {
            return false;
        }
    } else {
        return false;
    }
    if (!/^#[a-f\d]{6}$/.test(pas.hcl)) {
        return false;
    }
    if (!/(amb)|(blu)|(brn)|(gry)|(grn)|(hzl)|(oth)/.test(pas.ecl)) {
        return false;
    }
    return /^\d{9}$/.test(pas.pid);

}

function inRange(value, start, end) {
    return value >= start && value <= end;
}

console.log(count);
