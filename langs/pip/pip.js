await loadPyodide();
DSO.startLoad();

pyodide.runPythonAsync(await (await fetch('/langs/pip/loader.py')).text() + '\nawait main()')
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