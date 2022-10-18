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

module.exports.equate = equate;