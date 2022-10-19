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
    
    var Meme;

 
    return `((${One})+(${Two})-(${Three})-(${Total}))`
}

function randomName() {
    let name = "JAVASKID_"

    return "JAVASKID_0x"+Math.floor(Math.random()*16777215).toString(16);
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
        code += `${variableNames[Math.floor(Math.random()*variableNames.length)]} ${randomName()}=0x${Math.floor(Math.random()*16777215).toString(16)};`
    }

    return code;
}

module.exports.equate = equate;
module.exports.randomName = randomName;
module.exports.junk = junk;