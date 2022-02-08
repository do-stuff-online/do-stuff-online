fetch('https://raw.githubusercontent.com/abrudz/ngn-apl/master/apl.js').then(x => x.text()).then(text => {
    eval(text.replace('let apl=this.apl=', 'window.apl ='));
    window.apl = apl;
}).then(_ => console.log('ngn-apl.js loaded', apl))
DSO.defineMode('ngn-apl', async (code,input,args,output,debug) => {
    input = input.split`\n`
    try {
        output(apl.fmt(apl(code, {
            out: v => v && output(v)
        })).join('\n')+'\n')
    } catch(ex) { 
        debug(ex)
    }
})