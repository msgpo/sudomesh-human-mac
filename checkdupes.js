#!/usr/bin/env node

var fs = require('fs');

console.log("Checking wordlist for problems");

var lines = fs.readFileSync('wordlist').toString().split('\n');

if(lines.length != 256) {
    console.error("Wordlist must be 256 words long exactly!");
    process.exit(1);
}

var maxLen = 0;

var dupes = false;
var i, j, wordI, wordJ;
for(i=0; i < lines.length; i++) {
    wordI = lines[i].toLowerCase().replace(/\s+/, '');
    if(wordI.length > maxLen) maxLen = wordI.length;

    for(j=0; j < lines.length; j++) {
        if(i === j) continue;
        wordJ = lines[j].toLowerCase().replace(/\s+/, '');

        if(!wordI) {
            console.error("EMPTY OR INVALID ENTRY ON LINE:", i);
            process.exit(1);
        }
        if(!wordJ) {
            console.error("EMPTY OR INVALID ENTRY ON LINE:", j);
            process.exit(1);
        }

        if(wordI == wordJ) {
            console.error("DUPLICATE FOUND ON LINE", i, "and", j, lines[i]);
            dupes = true;
        }
    }
}

if(!dupes) {
    console.log("No duplicates found.");
    console.log("Longest word is", maxLen, "characters");
} else {
    console.log("Duplicates found!");
    process.exit(1);
}

