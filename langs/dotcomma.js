fetch('https://raw.githubusercontent.com/RedwolfPrograms/dotcomma/master/interpreter.js').then(x => x.text()).then(text => {
    eval('window.dotcomma = ' + text);
}).then(_ => console.log('dotcomma.js loaded', dotcomma))
DSO.defineMode('dotcomma',async (code,input,args,output,debug) => {
    try {
        let result = await dotcomma(code,eval(input),eval(args)?.string || false)
        output(result)
    } catch (ex) {
        debug(ex)
    }
    return;
})