const fs = require('fs');

fs.readFile('./3.txt', 'utf8', (err, data) => {
    const doregex = /do\(\)/g;
    const dontregex = /don't\(\)/g;
    let dos = [];
    let donts = [];
    let match;
    while ((match = doregex.exec(data)) !== null) {
        dos.push(match.index)
    }
    while ((match = dontregex.exec(data)) !== null) {
        donts.push(match.index);
    }
    console.log(dos);
    console.log(donts);

    const mulregex = /mul\(\d{1,3},\d{1,3}\)/g;
    let total = 0;

    while ((match = mulregex.exec(data)) !== null) {
        let doDistance = findDifferenceWithLargestLessThan(dos, match.index);
        let dontDistance = findDifferenceWithLargestLessThan(donts, match.index);
        console.log(dontDistance + ", " + doDistance);
        if((doDistance < dontDistance && dontDistance !== "none") || dontDistance === "none"){
            console.log("doing");
            const number = /\d{1,3}/g;
            const numbers = match[0].match(number);
            let a = numbers[0];
            let b = numbers[1];
            total += a*b;
        }
    }
    console.log(total);
});
function findDifferenceWithLargestLessThan(arr, num) {
    // Filter the array to include only numbers less than the given number
    const filtered = arr.filter(n => n < num);
    
    // If no such number exists, return null (or handle as needed)
    if (filtered.length === 0) {
        return "none";
    }
    
    // Find the maximum of the filtered array
    const largestLessThan = Math.max(...filtered);
    
    // Calculate and return the difference
    return num - largestLessThan;
}