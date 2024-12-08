const fs = require('fs');

let operations = 3;

fs.readFile('./7.txt', 'utf8', (err, d) => {
    //read the data
    let ops = d.split("\n");
    ops.forEach((op, index)=>{
        let temp = op.split(/[: ]+/);
        let sol = temp.splice(0, 1)[0];
        let nums = temp;
        op = {sol: Number(sol), nums: nums.map((num)=>Number(num))};
        ops[index] = op;
    })
    //now we need to go through and verify them
    let total = 0;
    ops.forEach((op)=>{
        
        let sol = op.sol;
        console.log(sol);

        let nums = op.nums;
        let possibilities = operations ** (nums.length-1);
        console.log(possibilities);

        for (let index = 0; index < possibilities; index++) {
            let operations = decimalToBinary(index);
            operations = operations.padStart(nums.length-1, 0);
            operations = operations.split("");
            let result = nums[0];
            operations.forEach((operation, index)=>{
                if(operation == 0){
                    result = result+nums[index+1];
                }else if(operation == 1){
                    result = result*nums[index+1];
                }else{
                    result = Number(result.toString()+nums[index+1].toString())
                }
            });
            
            if(result == sol){
                total+= result;
                return
            }
        }

    });
    console.log(total);
});
function decimalToBinary(decimalNumber) {
    return decimalNumber.toString(operations);
};