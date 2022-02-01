DSO.defineMode('deadfish-x', async (code,input,args,output,debug) => {
    var join = '', acc = 0, funcs = {};
    if(args.includes('n')) join = '\n';
    if(args.includes('s')) join = ' ';
    for(var i = 0; i < code.length; i++){
        var char = code[i]
        if(char == 'x') acc++;
        if(char == 'd') acc--;
        if(char == 'c') acc *= acc;
        if(char == 'k') output(acc + join)
        if(char == 'X') funcs[code[++i]] = code.slice(i,i=code.indexOf('C',i),i++)
        if(char == 'K') output(String.fromCharCode(acc))
        if(char == 'C') code = code.slice(0,i) + funcs[code[i+1]] + code.slice(i--+1)
        if(char == 'D') acc = 0;
        if(acc >= 256 || acc < 0) acc = 0;
    }
})