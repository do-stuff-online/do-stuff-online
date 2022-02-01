DSO.defineMode('hq9+', async (code,input,args,output,debug) => {
    var bottles = (function beerMe(amount) {
        return "012, 01.\n3, 412.5".replace(/\d/g, function (c) {
            return [amount || "No more", " bottles of beer", " on the wall", amount ? "Take one down, pass it around" : "Go to the store and buy some more", ((amount || 100) - 1) || "no more", amount ? "\n\n" : ""][c];
        }) + (amount ? beerMe(amount - 1) : "");
    })(99);
    for(var char of code){
        if(char == '9') output(bottles);
        if(char == 'H') output('Hello, world!');
    }
})

