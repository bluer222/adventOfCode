const fs = require('fs');

//read file charachter by charachter
let data = fs.readFileSync('./2.txt', 'utf-8');

//number
let number = "";
let array = [];
array.push([]);
//go through the charachters one by one
for (const ch of data) {
    //theres a space
    if (ch.charCodeAt(0) == 32) {
        array[array.length - 1].push(Number(number));
        number = "";
    //theres a new line
    } else if (ch.charCodeAt(0) == 10) {
        array[array.length - 1].push(Number(number));
        number = "";
        array.push([]);
    } else {
        number += ch;
    }
}
//add the last number(no new line at the end)
array[array.length - 1].push(Number(number));

//number of safe reports
var safeReports = 0;
//go through each array and check it
array.forEach(data => {
    safeReports += check(data, false);
});

console.log(safeReports);
function check(data, removed) {
    //detect increaseing
    let increasing = data[0] < data[1];
    let safe = "";
    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const nextItem = data[index + 1];
        //the code compares the current one ot the next one so we dont need to run the last index
        if (index !== data.length - 1) {
            //make sure its increasing or decreasing
            if (increasing) {
                if (item >= nextItem) {
                    safe = index;
                    break
                }
            } else {
                if (item <= nextItem) {
                    safe = index;
                    break
                }
            }
            //make sure distance is < 3
            if(Math.abs(nextItem-item) > 3){
                safe = index;
                break
            }
        }

    }
    //if we already used the problem Dampener and still failed return 0
    if (removed && safe !== "") {
        return 0
    //if it faled but we still have the problem Dampener then remove the fail and run again
    } else if (!removed && safe !== "") {
        var case1 = [...data];
        var case2 = [...data];
        var case3 = [...data];

        case1.splice(safe, 1);
        case2.splice(safe+1, 1);
        case3.splice(safe-1, 1);

        if(check(case1, true) === 1 || check(case2, true) === 1|| check(case3, true) === 1){
            return 1
        }
        return 0
    //if it worked return 1
    } else if (safe === "") {
        return 1
    } else {
        console.log("?")
    }
}