fetch('https://gist.githubusercontent.com/RedwolfPrograms/956683d03be5a318b0d15e5af3e199e7/raw/04a710451526bfc0bab79cb1952189f201cf2d48/ultrarisky.js').then(x => x.text()).then(text => {
    eval('window.'+text.slice(4))
}).then(_ => console.log('ultrarisky.js loaded', ultrarisky))
DSO.defineMode('ultrarisky', async (code,input,args,output,debug) => {
    try {
        if(!Array.isArray(eval(input))) throw "Input must be an JS array (like [1, 2, 3])"; 
        let containsInvalid = v => Array.isArray(v) ? v.some(containsInvalid) : typeof v == 'number' ? false : true
        if(containsInvalid(eval(input))) throw "Input can only contain arrays and numbers.";
        console.log(code)
        let result = await ultrarisky(code,eval(input))
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