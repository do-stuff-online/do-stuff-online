fetch('https://raw.githubusercontent.com/RedwolfPrograms/plumber/master/plumber.js').then(x => x.text()).then(text => {
    eval('window.plumber = ' + text);
}).then(_ => console.log('plumber.js loaded', plumber))
DSO.defineMode('plumber',async (code,input,args,output,debug) => {
    
    try {
        if(!Array.isArray(eval(input))) throw "Input must be an JS array (like [1, 2, 3])"; 
        let result = await plumber(code,eval(input))
        output(result)
    } catch (ex) {
        debug(ex)
    }
    return;
})