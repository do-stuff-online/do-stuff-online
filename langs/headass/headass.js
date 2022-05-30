import { runCode } from './interpreter.js'

DSO.defineMode('headass', async (code,input,args,output,debug) => {
    try {
        input = (input.split`\n` || []).map(eval)
    } catch {
        input = []
        debug("Warning: Error parsing input")
    }

    try {
        runCode(args, code, input, output)
    } catch(ex) { 
        debug(ex)
    }
})