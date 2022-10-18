const fs = require('fs')

function fakeConstants(constants) {
    let startTime = performance.now()

    let fake = fs.readFileSync('Obfuscation/fakeconstants.txt',{encoding:'utf8',flag:'r'});
    fake = fake.split('\n')
    for (let i = 0; i < fake.length; i++) {
        fake[i] = fake[i].trim()
    }
    let nc = []
    let e = 0;

    for(let i = 0; i < constants.length; i++) {
        nc[e] = fake[Math.floor(Math.random() * fake.length)];
        nc[e+1] = fake[Math.floor(Math.random() * fake.length)];
        nc[e+2] = fake[Math.floor(Math.random() * fake.length)];
        nc[e+3] = constants[i];
        nc[e+4] = fake[Math.floor(Math.random() * fake.length)];
        nc[e+5] = fake[Math.floor(Math.random() * fake.length)];
        e+=6;
    }

    let endTime = performance.now()

    console.log(`Fake constant generation completed in ${(endTime  - startTime).toFixed(3)} milliseconds!`)

    return nc;
}

function getConstants(src) {
    let startTime = performance.now()
	let token = "";
    let tokenizing = false;
    let isTokenizingInd = false;
	let strings = [];
    
    for(let i = 0; i < src.length; i++) {
    	let char = src[i];
        
        if (char=="'"||char=='"' && !isTokenizingInd){
        	if(src[i-1]=="\\") {
            	token = token.substr(0,-1);
                token += char;
                continue;
            }
            
            tokenizing = !tokenizing;
            
            if(!tokenizing){
                if(!strings.includes(token)) {
                    strings[strings.length]=token;
                }
                token = "";
                continue;
            }
            continue
        }
         
		if (char == "." || char == "["){
            if(tokenizing) {token += char;continue;}
            isTokenizingInd = !isTokenizingInd;
            
            if(!isTokenizingInd){
                if(!strings.includes(token)) {
                    strings[strings.length]=token;
                }
                token = "";
                continue;
            }
            continue
        }
        
        if(isTokenizingInd && !tokenizing) {
        	if( (char == "(" || char == "[" || char == " " || char == ";" || char == "\n" || char == "," || char == "]" || char == ".")) {
                if(!strings.includes(token)) {
                    strings[strings.length]=token;
                }
                token = "";
                isTokenizingInd = !isTokenizingInd;
            	continue;
            }
            token += char;
    	}

        if(tokenizing) {token += char;}
	}
    let endTime = performance.now()
    console.log(`Constant generation completed in ${(endTime  - startTime).toFixed(3)} milliseconds!`);
    return fakeConstants(strings);
};

module.exports.getConstants = getConstants;