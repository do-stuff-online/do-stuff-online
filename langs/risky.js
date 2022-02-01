fetch('https://raw.githubusercontent.com/RedwolfPrograms/risky/main/js/interpreter.js').then(x => x.text()).then(eval).then(() => console.log('risky.js loaded', risky)
)
DSO.defineMode('risky', async (code,input,args,output,debug) => {
    try {
        if(!Array.isArray(eval(input))) throw "Input must be an JS array (like [1, 2, 3])"; 
        let result = await risky.run(code,eval(input),eval(args)?.stringify)
        if(typeof result == 'object'){
            output(
                JSON.stringify(result, 
                    (_, v) => typeof v === 'bigint' ? `${v}n` : v
                )
                .replace(/"(-?\d+)n"/g, (_, a) => a)
            )
        }
        output(result.toString())
    } catch(ex) { 
        debug(ex)
    }
})