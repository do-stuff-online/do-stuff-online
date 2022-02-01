DSO.defineMode('brainfuck',async (code,input,args,output,debug) => {
    var tape = [0],tapeIndex = 0,tapeLimit = Infinity,cellLimit = 256,inputIndex = 0,brackets = [];
    if(args.includes('6')) cellLimit = 65536;
    if(args.includes('t')) tapeLimit = 256;
    if(args.includes('T')) tapeLimit = 65536;
    for(var codeIndex = 0; codeIndex < code.length; codeIndex++) {
        var char = code[codeIndex]
        if(char == '+') tape[tapeIndex] = (tape[tapeIndex] + 1) % cellLimit
        if(char == '-') tape[tapeIndex] = (tape[tapeIndex] + cellLimit - 1) % cellLimit;
        if(char == '.') output(String.fromCharCode(tape[tapeIndex]));
        if(char == ',') tape[tapeIndex] = input[inputIndex++]
        if(char == '>'){
            tapeIndex++;
            if(tapeIndex > tape.length){
                if(tape.length > tapeLimit){
                    tapeIndex = 0
                } else {
                    tape.push(0)
                }                
            }
        }
        if(char == '<'){
            tapeIndex--;
            if(tapeIndex == -1){
                debug('Warning: Pointer fallen of left end of tape, yeeted onto right end\n')
                if(tape.length > tapeLimit){
                    tapeIndex = tape.length - 1
                } else {
                    tape.unshift(0)
                    tapeIndex--;
                }
            }
        }
        if(char == '[') brackets.push(codeIndex)
        if(char == ']'){
            if(tape[tapeIndex]){
                codeIndex = brackets[brackets.length-1]
            } else {
                brackets.pop()
            }
        }
    }
})