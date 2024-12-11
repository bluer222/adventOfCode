const fs = require('fs');
function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}
//read file character by character
let data = fs.readFileSync('./10.txt', 'utf-8');
let lines = data.split("\n");
data = lines.join("");
console.log(lines)
let width = lines[0].length;
let height = lines.length;
let total = 0;
for (let i = 0; i < data.length; i++) {
    if (data.charAt(i) == "0") {
        let olddata = data;
        ratings(i, 1);
        data = olddata;
    }

}
console.log(total);
console.log(total);

function findTrail(character, currentCount) {
    data = setCharAt(data, character, ".");
    if (currentCount == 10) {
        total += 1;
        console.log("goal")
        return
    }
    console.log(addNewLine(data, width));
    let up = data.charAt(character - width) == currentCount;
    let down = data.charAt(character + width) == currentCount;
    //make sure we're not at the left edge
    if (character % width !== 0) {
        var left = data.charAt(character - 1) == currentCount;
    } else {
        var left = false;
    }
    //make sure we're not at the edge
    if ((character+1) % width !== 0) {
        var right = data.charAt(character + 1) == currentCount;
    } else {
        var right = false;
    }
    if (up) {
        console.log("Going up")
        findTrail(character - width, currentCount + 1);
    }
    if (down) {
        console.log("Going down")

        findTrail(character + width, currentCount + 1);
    }
    if (left) {
        console.log("Going left")

        findTrail(character - 1, currentCount + 1);
    }
    if (right) {
        console.log("Going right")

        findTrail(character + 1, currentCount + 1);
    }

}

function ratings(character, currentCount) {
    if (currentCount == 10) {
        total += 1;
        console.log("goal")
        return
    }
    console.log(addNewLine(data, width));
    let up = data.charAt(character - width) == currentCount;
    let down = data.charAt(character + width) == currentCount;
    //make sure we're not at the left edge
    if (character % width !== 0) {
        var left = data.charAt(character - 1) == currentCount;
    } else {
        var left = false;
    }
    //make sure we're not at the edge
    if ((character+1) % width !== 0) {
        var right = data.charAt(character + 1) == currentCount;
    } else {
        var right = false;
    }
    if (up) {
        console.log("Going up")
        ratings(character - width, currentCount + 1);
    }
    if (down) {
        console.log("Going down")

        ratings(character + width, currentCount + 1);
    }
    if (left) {
        console.log("Going left")

        ratings(character - 1, currentCount + 1);
    }
    if (right) {
        console.log("Going right")

        ratings(character + 1, currentCount + 1);
    }

}

function addNewLine(str, n) {
    return str.replace(new RegExp(`(.{${n}})`, 'g'), '$1\n');
}