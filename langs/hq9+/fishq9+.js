DSO.defineMode('fishq9+', async (code,input,args,output,debug) => {
    let bottles = (function beerMe(amount) {
        return "012, 01.\n3, 412.5".replace(/\d/g, function (c) {
            return [amount || "No more", " bottles of beer", " on the wall", amount ? "Take one down, pass it around" : "Go to the store and buy some more", ((amount || 100) - 1) || "no more", amount ? "\n\n" : ""][c];
        }) + (amount ? beerMe(amount - 1) : "");
    })(99);
    let acc = 0
    for(let char of code){
        if ('+iI'.includes(char)) acc++
        if ('dD'.includes(char)) acc--
        if ('sS'.includes(char)) acc **= 2
        if (char == '9') output(bottles);
        if ('qQ'.includes(char)) output(code);
        if ('hH'.includes(char)) output('Hello, world!');
        if ('oO'.includes(char)) output(acc);
        if ('kK'.includes(char)) return;
    }
})

