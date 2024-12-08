const fs = require('fs');

let types = [];
let locations = {};
//this array stores the points that are affected
let affectedPoints = [];
let chars;
let width;
let height;
//import the files
fs.readFile('./8.txt', 'utf8', (err, d) => {
    //find the width and height
    let lines = d.split("\n");
    width = lines[0].length;
    height = lines.length;
    //this is an array of each character(excluding \n)
    chars = lines.join("").split("");
    chars.forEach((char, index) => {
        //if the character is a transmitter
        if (char !== ".") {
            //if the type is new add it to types
            //types would have like [A, c, 2, 3] because those are the transmitter types
            if (types.indexOf(char) == -1) {
                types.push(char);
                locations[char] = [];
            }
            //add the location
            locations[char].push({ x: index % width, y: Math.floor(index / width) })
        }
    })
    console.log(locations);

    //go through each type of transmitter
    types.forEach((type) => {
        //get the array of transmitters
        //this array looks like [{x: #, y: #}, {x: #, y: #}, {x: #, y: #}]
        let transmitters = locations[type];
        //this function generates binary numbers with two ones
        //if there are 4 transmitters then there are some ammount of possiblities
        //eg 1001, 1100, 0011
        let trPairs = findPairs(transmitters.length);
        //now we test if this pair of transmitters lines up with any points
        trPairs.forEach((pair) => {
            console.log(pair)
            console.log(transmitters)
            console.log(pair.indexOf("1"))
            //first transmitter(this is the transmitter thats at the same index of the first 1 in the binary number)
            let firstTrans = transmitters[pair.indexOf("1")];
            //second transmitter(this is the transmitter thats at the same index of the second 1 in the binary number)
            let secondTrans = transmitters[pair.indexOf("1", pair.indexOf("1") + 1)];
            //points are x away from one transmitter but 2x away from another
            //to do this we just need to get the line, and exend it by its length
            //think about it, if you have a line with a and b and you extend it by its lenght in the a direction
            //then the new c point will be twice as far from b as it is a
            let xDistanceBetween = firstTrans.x - secondTrans.x;
            let yDistanceBetween = firstTrans.y - secondTrans.y;
            //this is for part 1
            //addPoint(firstTrans.x+xDistanceBetween, firstTrans.y+yDistanceBetween);
            //addPoint(secondTrans.x-xDistanceBetween, secondTrans.y-yDistanceBetween);
            //for part 2 we need to keep going out
            //we start i at 0 to include the transmitterers as affected points
            let i = 0;
            while ((xDistanceBetween * i) + firstTrans.x >= 0 && (xDistanceBetween * i) + firstTrans.x < width && (yDistanceBetween * i) + firstTrans.y >= 0 && (yDistanceBetween * i) + firstTrans.y < height) {
                addPoint(firstTrans.x + (xDistanceBetween * i), firstTrans.y + (yDistanceBetween * i));
                i++;
            }
            i = 0;

            while (secondTrans.x - (xDistanceBetween * i) >= 0 && secondTrans.x - (xDistanceBetween * i) < width && secondTrans.y - (yDistanceBetween * i) >= 0 && secondTrans.y - (yDistanceBetween * i) < height) {
                addPoint(secondTrans.x - (xDistanceBetween * i), secondTrans.y - (yDistanceBetween * i));
                i++;
            }
        });

    });
    console.log(affectedPoints.length)
    console.log(addNewLine(chars.join(""), width));
});
function pointOneThird(point1, point2) {
    const x = (point2.x - point1.x) / 3 + point1.x;
    const y = (point2.y - point1.y) / 3 + point1.y;
    return { x, y };
}
function addPoint(x, y) {
    if (!affectedPoints.includes([x, y].toString()) && x >= 0 && y >= 0 && x < width && y < height) {
        affectedPoints.push([x, y].toString());
        chars[x + (y * width)] = "#";
    }
}
function decimalToBinary(decimalNumber) {
    return decimalNumber.toString(2);
};
function findPairs(n) {
    let pairs = [];
    for (let i = 0; i < Math.pow(2, n); i++) {
        let binaryString = decimalToBinary(i).padStart(n, '0');
        if (numberOfCharInString(binaryString, 1) == 2) {
            pairs.push(binaryString.split(""));
        }

    }
    return pairs
}
function numberOfCharInString(s, char) {
    return s.split(char).length - 1;
}
function addNewLine(str, n) {
    return str.replace(new RegExp(`(.{${n}})`, 'g'), '$1\n');
}