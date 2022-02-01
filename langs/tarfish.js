fetch('https://raw.githubusercontent.com/chunkybanana/Tarfish/main/tarfish.js').then(x => x.text()).then(text => {
    eval('window.tarfish = ' + text.slice(17));
}).then(_ => console.log('tarfish.js loaded', tarfish))
DSO.defineMode('tarfish', async (code,input,args,output,debug) => {
    try {
        if(input) {
            if(!Array.isArray(eval(input))) throw "Input must be an JS array (like [1, 2, 3])"; 
            if(eval(input).some(x => typeof x != 'number' && typeof x != 'string')) throw "Input can only contain numbers and strings.";
        }
        let result = await tarfish(code,eval(input) || [[]])
        output(result)
    } catch(ex) { 
        debug(ex)
    }
})