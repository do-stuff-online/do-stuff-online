DSO.defineMode('hq9+',(code,input,args,output,debug) => {
    var bottles = (function beerMe(amount) {
        return "012, 01.\n3, 412.5".replace(/\d/g, function (c) {
            return [amount || "No more", " bottles of beer", " on the wall", amount ? "Take one down, pass it around" : "Go to the store and buy some more", ((amount || 100) - 1) || "no more", amount ? "\n\n" : ""][c];
        }) + (amount ? beerMe(amount - 1) : "");
    })(99), acc = 1;
    for(var char of code){
        if(char == '9') output(bottles);
        if(char == 'Q') output(code);
        if(char == 'H') output('Hello, world!');
        if(char == '+') acc++;
        if(char == 'F' || char == 'f') for(var i=1;i<acc;i++) output((i%3<1?'Fizz'+(i%5<1?'Buzz':''):i%5<1?'Buzz':i) + '\n');
    }
})