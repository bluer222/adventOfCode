//for this to run you need to do --stack-size=10000000000
//because recursion

function isEven(n) {
    return Math.abs(n % 2) === 0;
}
const fs = require('fs');

//read file character by character
let data = fs.readFileSync('./9.txt', 'utf-8');

//disk
let disk = [];


//tj
//go through the character one by one
for (let i = 0; i < data.length; i++) {
    let length = Number(data.charAt(i));
    if (isEven(i)) {
        for (let index = 0; index < length; index++) {
            disk.push({ type: "used", index: i / 2 });
        }
    } else {
        for (let index = 0; index < length; index++) {
            disk.push({ type: "empty" });
        }
    }
}
console.log(disk)
//disk = defrag(disk);
disk = defrag2(disk);

function defrag(disk) {
    //first we need to find used space
    let index = disk.length - 1;
    while (index >= 0 && disk[index].type == "empty") {
        index -= 1;
    }
    let dataToMove = disk[index];
    disk.splice(index, 1);
    //now we need to find empty space
    let newIndex = 0;
    while (newIndex < disk.length && disk[newIndex].type == "used") {
        newIndex += 1;
    }
    if (index == newIndex) {
        disk.splice(newIndex, 1, dataToMove);
        //its already defraged
        return disk
    } else {
        //now we insert the data
        console.log(newIndex);
        disk.splice(newIndex, 1, dataToMove);
        //recursive
        return defrag(disk);
    }
}

function defrag2(disk) {
    //we need to select blocks with decreasing index starting at the highest
    let index = disk[disk.length - 1].index;
    while (index >= 0) {
        const file = disk.filter(block => block.index == index);
        let ogIndex = disk.indexOf(file[0])
        const length = file.length;

        let openSpace = 0;
        let newIndex = 0;
        for (let i = 0; i < disk.length; i++) {
            if (disk[i].type == "used") {
                openSpace = 0;
            } else {
                //if we descovered a new open space
                if (openSpace == 0) {
                    newIndex = i;
                }
                openSpace += 1;
            }
            if (openSpace >= length) {
                break
            }
        }

        //if we descoved a new space
        if (openSpace >= length && newIndex < ogIndex) {
            //remove the open space and add the file
            for (let i = 0; i < length; i++) {
                disk.splice(newIndex+i, 1, { type: "used", index: index });
            }
            //remove the old file and add the open space
            for (let i = 0; i < length; i++) {
                disk.splice(ogIndex+i, 1, { type: "empty" });
            }

        }
        index -= 1;
    }
    return disk
}
console.log(disk)

console.log(checksum(disk));
function checksum(disk) {
    let checksumValue = 0;

    disk.forEach((block, index) => {
        if (block.type == "used") {
            checksumValue += index * block.index;
        }
    });
    return checksumValue;
}