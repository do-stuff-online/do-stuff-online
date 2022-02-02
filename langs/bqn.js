fetch('https://raw.githubusercontent.com/mlochbaum/BQN/master/docs/bqn.js').then(x => x.text()).then(text => {
    eval(text.replace('let bqn', 'window.bqn').replace('let fmt = ','window.fmt = '));
}).then(_ => console.log('bqn.js loaded', bqn))
DSO.defineMode('bqn', async (code,input,args,output,debug) => {
    try {
        output(fmt(bqn(code)))
    } catch(ex) { 
        try {
            debug(`${ex.kind} Error: ${ex.message[1]?.join?.('') ?? ex.message.join('')}`)
        } catch {
            debug('This program throws an error whose message is misdecoded. Add an issue on the github repo or ping me.')
        }
    }
})