fetch('https://raw.githubusercontent.com/chunkybanana/halfwit/master/halfwit.js').then(x => x.text()).then(eval).then(() => console.log('halfwit.js loaded', halfwit)
)
DSO.defineMode('halfwit', async (code,input,args,output,debug) => {
    try {
        let console = {
            log : v => output(v + '\n'),
            debug: v => output(v + '\n'),
        }
        input ||= []
        if(!Array.isArray(eval(input))) throw "Input must be an JS array (like [1, 2, 3])"; 
        let result = await halfwit(code,eval(input),args)
        output(result)
    } catch(ex) { 
        debug(ex)
        //console.log(ex)
    }
})