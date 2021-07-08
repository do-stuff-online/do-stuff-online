DSO.defineMode('hq9+',(code,input,args,output,debug) => {
    var bottles = (function beerMe(amount) {
        return "012, 01.\n3, 412.5".replace(/\d/g, function (c) {
            return [amount || "No more", " bottles of beer", " on the wall", amount ? "Take one down, pass it around" : "Go to the store and buy some more", ((amount || 100) - 1) || "no more", amount ? "\n\n" : ""][c];
        }) + (amount ? beerMe(amount - 1) : "");
    })(99);
    var rot13 = (val) => val.replace(/[a-zA-Z]/g,x=>String.fromCharCode((x.charCodeAt()-(z=x>='a'?97:65)+13)%26+z))
    for(var char of code){
        if(char == '9') output(bottles);
        if(char == 'Q') output(code);
        if(char == 'H') output('Hello, world!');
        if(char == 'C') output(input)
        if(char == 'I') DSO.activeMode.run(input)
        if(char == 'X') eval([...code].map(x=>String.fromCharCode(x.charCodeAt() + 7)))
        if(char == 'R') output(rot13(input))
    }
})

