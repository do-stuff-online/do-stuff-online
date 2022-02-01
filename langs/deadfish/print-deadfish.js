DSO.defineMode('print-deadfish', async (code,input,args,output,debug) => {
    var join = '', acc = 0;
    if(args.includes('n')) join = '\n';
    if(args.includes('s')) join = ' ';
    for(var char of code){
        if(char == 'i') acc++;
        if(char == 'd') acc--;
        if(char == 's') acc *= acc;
        if(char == 'o') output(acc + join)
        if(char == 'p') output(String.fromCharCode(acc))
        if(char == 'h') break;
        if(acc == 256 || acc < 0) acc = 0;
    }
})