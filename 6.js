const fs = require('fs');
var width;
var height;
fs.readFile('./6.txt', 'utf8', (err, d) => {
    let blocks = [];

    let lines = d.split("\n")
    height = lines.length;
    width = lines[0].length;
    //this will no longer have \n between lines
    let data = lines.join("");

    let guardIndex = data.indexOf("^");
    let guardy = Math.floor(guardIndex / width);
    let guardx = guardIndex % width;
    console.log(guardx);
    console.log(guardy);

    //now we need to find the blocks
    //split data into individual chars
    let chars = data.split("");
    chars.forEach((char, index) => {
        if (char == "#") {
            blocks.push({ x: index % width, y: Math.floor(index / width) });
        }
    });
    positions = simulate(guardx, guardy, blocks, chars);
    let numberOfLoops = 0;
    positions.forEach((pos, index) => {
        pos = pos.split(",");
        let newBlocks = [{ x: pos[0], y: pos[1]}].concat(blocks);
        if (simAndFindLoops(guardx, guardy, newBlocks, chars)) {
            console.log(numberOfLoops);
            numberOfLoops += 1;
        }

        console.log((index / positions.length )*100+ "% done");
    });
    console.log(numberOfLoops);


});
function addNewLine(str, n) {
    return str.replace(new RegExp(`(.{${n}})`, 'g'), '$1\n');
}
function simulate(guardx, guardy, blocks, chars) {

    let positions = [];
    //add start pos
    positions.push(guardx + "," + guardy);
    chars[guardx + (guardy * width)] = "X";
    //0 = up 1 = right 2 = down 3= left
    let direction = 0;
    //now lets simulate
    while (guardy < height && guardy > 0 && guardx < width && guardx > 0) {
        let x = 0;
        let y = 0;
        if (direction == 0) {
            y -= 1;
        }
        if (direction == 1) {
            x += 1;
        }
        if (direction == 2) {
            y += 1;
        }
        if (direction == 3) {
            x -= 1;
        }
        let blocked = false;
        //did we just move into a stop
        blocks.forEach((block) => {
            if (block.x == guardx + x && block.y == guardy + y) {
                blocked = true;
            }
        });
        if (blocked) {
            direction += 1;
            if (direction == 4) {
                direction = 0;
            }
        } else {
            guardx += x;
            guardy += y;
        }
        if (positions.indexOf(guardx + "," + guardy) == -1) {
            positions.push(guardx + "," + guardy);
        }
        chars[guardx + (guardy * width)] = "X";
    }
    console.log(addNewLine(chars.join(""), width))
    console.log(guardx);
    console.log(guardy);

    //idk why i need to subtract one
    console.log(positions.length - 1);
    return positions
}
function simAndFindLoops(guardx, guardy, blocks, chars) {

    let positions = [];
    //add start pos
    positions.push(guardx + "," + guardy);
    chars[guardx + (guardy * width)] = "X";

    //0 = up 1 = right 2 = down 3= left
    let direction = 0;
    let moves = 0;
    //now lets simulate
    while (moves < 10000 && guardy < height && guardy > 0 && guardx < width && guardx > 0) {
        let x = 0;
        let y = 0;
        if (direction == 0) {
            y -= 1;
        }
        if (direction == 1) {
            x += 1;
        }
        if (direction == 2) {
            y += 1;
        }
        if (direction == 3) {
            x -= 1;
        }
        let blocked = false;
        //did we just move into a stop
        blocks.forEach((block) => {
            if (block.x == guardx + x && block.y == guardy + y) {
                blocked = true;
            }
        });
        if (blocked) {
            direction += 1;
            if (direction == 4) {
                direction = 0;
            }
        } else {
            guardx += x;
            guardy += y;
            moves += 1;
        }
        if (positions.indexOf(guardx + "," + guardy) == -1) {
            positions.push(guardx + "," + guardy);
        }
        chars[guardx + (guardy * width)] = "X";
    }
    //console.log(moves);
    if (moves == 10000) {
        return true
    } else {
        return false
    }
}