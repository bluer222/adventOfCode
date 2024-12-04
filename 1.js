const fs = require('fs');

let data = fs.readFileSync('./1.txt', 'utf-8');
let char1 = "";
let char2 = "";
let list1 = [];
let list2 = [];
let doing = 1;
for (const ch of data){
    //theres a space
    if(ch.charCodeAt(0) == 32){
        doing = 2;
        if(char1 !== ""){
            list1.push(char1);
            char1 = "";
        }
    }else if(ch.charCodeAt(0) == 10){
        doing = 1;
        if(char2 !== ""){
            list2.push(char2);
            char2 = "";
        }
    }else{
        if(doing == 1){
            char1 += ch;
        }else{
            char2 += ch;
        }
    }
}
if(char1 !== ""){
    list1.push(char1);
    char1 = "";
}
if(char2 !== ""){
    list2.push(char2);
    char2 = "";
}
list1.sort(function(a, b){return a-b});
list2.sort(function(a, b){return a-b});
/*
let result = 0;
list1.forEach((element, index) => {
    result += Math.abs(element - list2[index])
});
console.log(result);
*/

let list1index = 0;
let lookingFor = 0;
let score = 0;
while(list1index < list1.length){
    lookingFor = list1[list1index];
    //find how 
    let numOfoccurances = 0;
    let list2index = 0;
    while(list2[list2index] !== lookingFor && list2index < list2.length){
        list2index +=1;
    }
    while(list2[list2index] == lookingFor){
        numOfoccurances +=1;
        list2index +=1;
    }
    score+= lookingFor* numOfoccurances;
    list1index+=1;
}
console.log(score)