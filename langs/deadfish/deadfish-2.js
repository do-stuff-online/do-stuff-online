DSO.defineMode('deadfish-2', async (code,input,args,output,debug) => {
    var join = '', acc = 0,s = '';
    if(args.includes('n')) join = '\n';
    if(args.includes('s')) join = ' ';
    for(var char of code){
        if(char == 'i') acc++;
        if(char == 'd') acc--;
        if(char == 's') acc *= acc;
        if(char == 'o') output(acc + join)
        if(char == 'c') output(String.fromCharCode(acc))
        if(char == 'n') acc = 0;
        if(char == 'h') break;
        if(char == 'r') s = input
        if(char == 'O') output(s)
        if(acc == 256 || acc < 0) acc = 0;
    }
})