DSO.defineMode('functional-deadfish', async (code,input,args,output,debug) => {
    var join = '',acc = 0, func_stack = [];
    if(args.includes('n')) join = '\n';
    if(args.includes('s')) join = ' ';
    for(var i = 0; i < code.length; i++){
        var char = code[i]
        if(char == 'i') acc++;
        if(char == 'd') acc--;
        if(char == 's') acc *= acc;
        if(char == 'o') output(acc + join)
        if(char == 'f'){
            var new_index = code.indexOf('f',i+1)
            if(new_index == -1){
                debug('Unmatched f');
                break;
            }
            func_stack[acc] = code.slice(i + 1,new_index);
            i = new_index;
        }
        if(char == 'C') code = code.slice(0,i) + func_stack[acc] + code.slice(i--+1);
    }
})