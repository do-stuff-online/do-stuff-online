fetch('https://raw.githubusercontent.com/ETHproductions/japt/master/dependencies/shoco.js').then(x => x.text()).then(text => {
    eval(text);
}).then(() => {
    fetch('https://raw.githubusercontent.com/ETHproductions/japt/master/src/japt-interpreter.js').then(x => x.text()).then(text => {
        eval(text).replace('var Japt = ','window.Japt = ');
    });
}).then(() => console.log('japt.js loaded', Japt));

DSO.defineMode('japt', async (code,input,args,output,debug) => {
    Japt.run(code, input, false, null, output, debug);
})