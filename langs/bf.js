DSO.defineMode('brainfuck',async (code,input,args,output,debug) => {
    var tape = [0],tapeIndex = 0,tapeLimit = Infinity,cellLimit = 256,inputIndex = 0,brackets = [];
    input = [...input]
    if(args.includes('6')) cellLimit = 65536;
    if(args.includes('t')) tapeLimit = 256;
    if(args.includes('T')) tapeLimit = 65536;
    let codeTable = {
        '+': 'tape[tapeIndex] = (tape[tapeIndex] + 1) % cellLimit',
        '-': 'tape[tapeIndex] = tape[tapeIndex] ? tape[tapeIndex] - 1 : cellLimit - 1',
        '>': 'tapeIndex = (tapeIndex + 1) % tapeLimit',
        '<': 'tapeIndex = tapeIndex ? tapeIndex - 1 : Number.isFinite(tapeLimit) ? tapeLimit - 1 : tape.unshift(0) && 0',
        '[': 'while(tape[tapeIndex]){',
        ']': '}',
        '.': 'output(String.fromCharCode(tape[tapeIndex]))',
        ',': 'tape[tapeIndex] = input.shift().charCodeAt()',
    }
    let transpiled = '';
    for(let char of code){
        if(char in codeTable){
            transpiled += codeTable[char] + '\n'
        }
    }
    if(args.includes('c')) debug(transpiled);
    eval(transpiled);
})