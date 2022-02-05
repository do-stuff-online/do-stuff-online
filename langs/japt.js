fetch('https://raw.githubusercontent.com/ETHproductions/japt/master/dependencies/shoco.js').then(x => x.text()).then(text => {
    eval(text);
    console.log('shoco.js loaded', shoco)
}).then(() => {
    fetch('https://raw.githubusercontent.com/ETHproductions/japt/master/src/japt-interpreter.js').then(x => x.text()).then(text => {
        eval(
            text.replace('var Japt = ','window.Japt = ')
            .replace(/shoco\./g, 'window.shoco.')
        );
        console.log(Japt)
    }).then(() => console.log('japt.js loaded', Japt)).catch(console.error);
})

DSO.defineMode('japt', async (code,input,args,output,debug) => {
    Japt.run(code, input, false, null, output, debug);
})