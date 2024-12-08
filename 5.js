const fs = require('fs');

fs.readFile('./5.txt', 'utf8', (err, data) => {
    //split the file by lines
    data = data.split("\n");
    //array including all the rules(an item would look line [47, 53])
    let rules = [];
    //array including all the page lists
    let pageLists = [];
    //go through each line
    data.forEach(string => {
        //if its a rule add it to rules
        if (string.includes("|")) {
            let rule = string.split("|");
            rule = rule.map((number) => (Number(number)));
            rules.push(rule)
        //if its a list add it to lists
        } else if (string.includes(",")) {
            let pages = string.split(",");
            pages = pages.map((page) => (Number(page)));
            pageLists.push(pages)
        }
    });
    //part1
    let middleNumbers1 = 0;
    //part2
    let middleNumbers2 = 0;
    //go through each list
    pageLists.forEach(list => {
        //we need to make check if the list follows the rules
        let rulesFollowed = 0;
        //go through each rule and see if its followed
        rules.forEach(rule => {
            rulesFollowed += followsRule(rule, list);
        });
        //if all rules are followed
        if (rulesFollowed == rules.length) {
            //add the middle to part 1
            middleNumbers1 += list[Math.floor(list.length / 2)]
        }else{
            //if this does not follow rules then we fix then count it for part 2
            //go through each rule and fix it so it folllows
            rules.forEach(rule => {
                fix(rule, list);
            });
            rules.forEach(rule => {
                fix(rule, list);
            });
            
            console.log(list);
            middleNumbers2 += list[Math.floor(list.length / 2)]
        }
    });
    //log results
    console.log(middleNumbers1);
    console.log(middleNumbers2);
});
function followsRule(rule, list){{
    if (list.indexOf(rule[0]) !== -1 && list.indexOf(rule[1]) !== -1) {
        //check if it follows the rule
        if (list.indexOf(rule[0]) < list.indexOf(rule[1])) {
            return 1;
        }else{
             return 0;
        }
    } else {
        //if it doesnt have one of the numbers
        return 1;
    }
}}
function fix(rule, list){{
    if (list.indexOf(rule[0]) !== -1 && list.indexOf(rule[1]) !== -1) {
        //check if it doesnt follows the rule
        if (list.indexOf(rule[0]) > list.indexOf(rule[1])) {
        //fix it
            //remove rule 0 number
            list.splice(list.indexOf(rule[0]), 1);
            //instert it right before rule 1 number
            list.splice(list.indexOf(rule[1]), 0, rule[0]);
            //now its fixed
        }
    }
}}