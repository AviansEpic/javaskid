const constantModule = require('./Obfuscation/Constants')
const generationModule = require("./Obfuscation/Generation")

const fs = require('fs')

const config = JSON.parse(fs.readFileSync("config.json"))


const { execSync } = require('child_process')
const { performance } = require('perf_hooks')



const obfStartTime = performance.now()

execSync("google-closure-compiler input.js -O WHITESPACE_ONLY --js_output_file .\\temp\\minified.js") // minifier

let constantVarName = generationModule.randomName()
let keyVar = generationModule.randomName();
let resultVar = generationModule.randomName();
let forArgVar = generationModule.randomName();
let stringVar = generationModule.randomName();
let xorEncryptVar = generationModule.randomName();

let xorKey = Math.floor(Math.random()*200)

let obf = `//${config["watermarks"]["watermark_comment"]}

var ${config["watermarks"]["watermark_function_name"]}=((${stringVar},${keyVar})=>{var ${resultVar}="";for(var ${forArgVar}=${generationModule.equate(0)};${forArgVar}<${stringVar}.length;${forArgVar}++){${resultVar}+=String.fromCharCode(${stringVar}[${forArgVar}].charCodeAt(${generationModule.equate(0)})^${keyVar})}return ${resultVar}}),Made_By_Avian=true,javaskidbest=(()=>{var ${xorEncryptVar}=protected_by_javaskid;${generationModule.junk(30)}var ${constantVarName}={`


let src = fs.readFileSync('.\\temp\\minified.js',{encoding:'utf8',flag:'r'}).trim();

src = src.replaceAll("\r","");
src = src.replaceAll("\n","")

let constants = constantModule.getConstants(src);

String.prototype.toUnicode = function(){
    var result = "";
    for(var i = 0; i < this.length; i++){
        // Assumption: all characters are < 0xffff
        result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
    }
    return result;
};

String.prototype.xorEncrypt = function(key){
    var result = "";
    for(var i = 0; i < this.length; i++){
        result += String.fromCharCode(this[i].charCodeAt(0) ^ key)
    }
    return result;
};


const encStartTime = performance.now()

for (let i = 0; i<constants.length; i++) {
    let index = generationModule.makeid(30)

	obf += `"${index}":"${constants[i].xorEncrypt(xorKey).toUnicode()}"+("${generationModule.makeid(20)}").substr(${generationModule.equate(0)},${generationModule.equate(0)}),`;
	index = '"' + index + '"'
	src = src.replaceAll(`"${constants[i]}"`, `${xorEncryptVar}(${constantVarName}[${index}],${generationModule.equate(xorKey)})`)
   	src = src.replaceAll(`'${constants[i]}'`, `${xorEncryptVar}(${constantVarName}[${index}],${generationModule.equate(xorKey)})`)
   	src = src.replaceAll(`?.${constants[i]}`, `?.[${xorEncryptVar}(${constantVarName}[${index}],${generationModule.equate(xorKey)})]`)
   	src = src.replaceAll(`.${constants[i]}`, `[${xorEncryptVar}(${constantVarName}[${index}],${generationModule.equate(xorKey)})]`)
   	src = src.replaceAll(`[${constants[i]}]`, `[${xorEncryptVar}(${constantVarName}[${index}],${generationModule.equate(xorKey)})]`)

	constants[i] = constants[i].xorEncrypt(xorKey).toUnicode()
}

const encEndTime = performance.now()

console.log(`Constant encryption completed in ${(encEndTime  - encStartTime).toFixed(3)} milliseconds!`)

obf = obf.slice(0,-1) + "};" + src + generationModule.junk(100).substr(-1) + `})('${config["watermarks"]["watermark_last_string"]}');`

obf = obf.replaceAll(";;", ";")

fs.writeFileSync("output.js",obf)

const obfEndTime = performance.now()


console.log(`Obfuscated in ${(obfEndTime-obfStartTime).toFixed(3)} milliseconds!`)
