const fs = require('fs');

fs.readFile('./4.txt', 'utf8', (err, data) => {
    //part1(data);
    part2(data);
});
function part2(data) {
    let matches = 0;
    for (let index = 0; index < data.length; index++) {
        const letter = data.charAt(index);
        if (letter == "M" || letter == "S") {
            let isItMas = isMas(data, index);
            //if theres one match
            if (isItMas[1] == 1) {
                //if the match is forwards
                if (isItMas[0] == 1) {
                    //is two characters from now a backwards match?
                    if (isMas(data, index + 2)[0] == 2) {
                        //if yes then it makes an x
                        matches += 1;
                    }
                }
                //if the match is backwards then we wouldve caught it with a forwards match
            } else if (isItMas[1] == 2) {
                //it maches forward and backwards
                //is two characters from now a backwards match?
                if (isMas(data, index + 2)[0] == 2) {
                    //if yes then it makes an x
                    matches += 1;
                }
            }
        }
    }
    console.log(matches);
}
function isMas(data, index) {
    //one line is 141 chars
    let line = 141;

    const letter = data.charAt(index);
    let totalmatches = 0;
    let matchType = 0;
    //let line = Math.floor(index / 140);
    //let startOfLine = (line * 140);
    //let distanceFromStartOfLine = index - startOfLine;
    //look for farward matches
    if (letter == "M") {
        //next line next spot
        if (data.charAt(line + 1 + index) == "A") {
            if (data.charAt((line + 1) * 2 + + index) == "S") {
                matchType = 1;
                totalmatches += 1;

            }
        }

        //next line pervious spot
        if (data.charAt((line - 1) + index) == "A") {
            if (data.charAt((line - 1) * 2 + index) == "S") {
                matchType = 2;
                totalmatches += 1;

            }

        }
    }
    //look for backwards matches
    if (letter == "S") {
        //must not be at the end of the line
        if (data.charAt(line + 1 + index) == "A") {
            if (data.charAt((line + 1) * 2 + index) == "M") {
                matchType = 1;
                totalmatches += 1;
            }
        }

        //make sure not the start of a line
        if (data.charAt((line - 1) + index) == "A") {
            if (data.charAt((line - 1) * 2 + index) == "M") {
                matchType = 2;
                totalmatches += 1;
            }
        }

    }
    return [matchType, totalmatches];
}
function part1(data) {
    //forwards and backrwards xmas
    let fwline = /XMAS/g;
    let bkline = /SAMX/g;

    //match them with regex
    let matches = data.match(fwline);
    matches = matches.concat(data.match(bkline));

    //add matches to toatal
    let totalmatches = matches.length;

    console.log(totalmatches);
    //find diagnols
    for (let index = 0; index < data.length; index++) {
        const letter = data.charAt(index);
        if (letter == "X" || letter == "S") {
            //one line is 141 chars
            let line = 141;
            //let line = Math.floor(index / 140);
            //let startOfLine = (line * 140);
            //let distanceFromStartOfLine = index - startOfLine;
            //look for farward matches
            if (letter == "X") {
                //next line, same spot
                if (data.charAt(line + index) == "M") {
                    if (data.charAt(line * 2 + index) == "A") {
                        if (data.charAt(line * 3 + index) == "S") {
                            totalmatches += 1;
                        }
                    }
                }
                //must not be at the end of the line
                //next line next spot
                if (data.charAt(line + 1 + index) == "M") {
                    if (data.charAt((line + 1) * 2 + + index) == "A") {
                        if (data.charAt((line + 1) * 3 + index) == "S") {
                            totalmatches += 1;
                        }
                    }
                }

                //make sure not the start of a line
                //next line pervious spot
                if (data.charAt((line - 1) + index) == "M") {
                    if (data.charAt((line - 1) * 2 + index) == "A") {
                        if (data.charAt((line - 1) * 3 + index) == "S") {
                            totalmatches += 1;
                        }
                    }

                }
            }
            //look for backwards matches
            if (letter == "S") {
                if (data.charAt(line + index) == "A") {
                    if (data.charAt(line * 2 + index) == "M") {
                        if (data.charAt(line * 3 + index) == "X") {
                            totalmatches += 1;
                        }
                    }
                }
                //must not be at the end of the line
                if (data.charAt(line + 1 + index) == "A") {
                    if (data.charAt((line + 1) * 2 + index) == "M") {
                        if (data.charAt((line + 1) * 3 + index) == "X") {
                            totalmatches += 1;
                        }
                    }
                }

                //make sure not the start of a line
                if (data.charAt((line - 1) + index) == "A") {
                    if (data.charAt((line - 1) * 2 + index) == "M") {
                        if (data.charAt((line - 1) * 3 + index) == "X") {
                            totalmatches += 1;
                        }
                    }
                }

            }
        }
    }
    console.log(totalmatches);
}