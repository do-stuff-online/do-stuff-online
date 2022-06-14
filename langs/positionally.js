fetch('https://raw.githubusercontent.com/chunkybanana/positionally/master/positionally.js').then(x => x.text()).then(eval).then(() => console.log('positionally.js loaded', window.positionally))

DSO.defineMode('positionally', async (code,input,args,output,debug) => {
    try {
        input ||= []
        if(!Array.isArray(eval(input))) throw "Input must be an JS array (like [1, 2, 3])"; 
        await positionally(code,eval(input),args, output)
    } catch(ex) { 
        debug(ex)
    }
})