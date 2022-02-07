fetch('https://johnearnest.github.io/ok/oK.js').then(x => x.text()).then(text => {
    eval(text.replace(/\nthis/g, '\nwindow'))
}).then(_ => console.log('oK.js loaded', parse, run, baseEnv, format))
DSO.defineMode('k-ok',async (code,input,args,output,debug) => {
    try {
        if(input) debug('Input not supported')
        var env = baseEnv();
    	var ret = run(parse(code), baseEnv());
        output(format(ret))
    } catch (ex) {
        debug(ex)
    }
})