const fs = require('fs')

const config = JSON.parse(fs.readFileSync("config.json"))


const equate = function(Number) {
    // **
    // Credits: debug#8888
    // He wanted me to use it, so here ya go buddy
    // **
    var One = Math.floor(Math.random() * 100000);
    var Two =  Math.floor(Math.random() * 100000);
    var Three = Math.floor(Math.random() * 100000);
    
    var Result = One + Two - Three
    var Total = (Result - Number);

    return `((${One-20}+("${makeid(20)}").length)+(${Two-20}+("${makeid(20)}").length)-(${Three-20}+("${makeid(20)}").length)-(${Total-20}+("${makeid(20)}").length))`
}

function randomName() {
    let name = config["watermarks"]["watermark_variable"]

    return name+makeid(10);
}

function makeid(length) {
    var result = '';
    var characters = config.custom_alphabet;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// generates useless code
function junk(functions) {
    let code = "";
    let variableNames = [
        "var",
        "let",
        "const"
    ];
    
    for (let i = 0; i < functions; i++) {
        code += `${variableNames[Math.floor(Math.random()*variableNames.length)]} ${randomName()}="${makeid(20)}";`
    }

    return code;
}

module.exports.equate = equate;
module.exports.randomName = randomName;
module.exports.junk = junk;
module.exports.makeid = makeid;
