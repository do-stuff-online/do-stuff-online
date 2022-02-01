fetch('https://raw.githubusercontent.com/RedwolfPrograms/unsure/master/unsure.js').then(x => x.text()).then(text => {
    eval('window.unsure = ' + text);
}).then(_ => console.log('unsure.js loaded', unsure))
DSO.defineMode('unsure',async (code,input,args,output,debug) => {
    let console = {
        log(...args){
            output(args.map(value => {
                if(typeof value != 'object'){
                    return value.toString()
                }
                let obj = {}
                for(let key in value){
                    if(typeof value[key] == 'bigint') {
                        obj[key] = Number(value[key])
                    }
                }
                return JSON.stringify(obj)
            }).join` ` + '\n')
        },
        warn(...args){
            debug('Warning: ' + args.join` `)
        }
    }
    try {
        let result = await unsure(code,eval(input),eval(args)?.string || false)
        output(result)
    } catch (ex) {
        debug(ex)
    }
    return;
})