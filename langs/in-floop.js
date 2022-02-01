fetch('https://raw.githubusercontent.com/RedwolfPrograms/in-floop/main/in_floop.js').then(x => x.text()).then(text => {
    eval('window.'+text.slice(4))
}).then(_ => console.log('in-floop.js loaded', in_floop))
DSO.defineMode('in-floop',async (code,input,args,output,debug) => {
    let console = {
        log(...args){
            output(
                args.map(
                    value => {
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
                    }
                ).join` ` + '\n'
            )
        }
    }
    try {
        let result = await in_floop(code,eval(input),eval(args) || 0)
        output(result)
    } catch (ex) {
        debug(ex)
    }
    return;
})