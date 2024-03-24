await loadPyodide();
DSO.startLoad();

let loader = location.origin + location.pathname + 'langs/pip/loader.py';
pyodide.runPythonAsync(await (await fetch(loader)).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("pip", async (code,input,args,output,debug) => {
    let argstring = args + ' ' + input;
    try {
        pyodide.globals.get('pip')(code, argstring)
    } catch (e) {
        console.log(e)
        debug(e)
    }
})