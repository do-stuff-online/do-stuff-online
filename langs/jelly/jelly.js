await loadPyodide();
DSO.startLoad();

pyodide.runPythonAsync(await (await fetch('/langs/jelly/loader.py')).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("jelly", async (code,input,args,output,debug) => {
    try {
        pyodide.globals.get('run')(code, eval(args) || [])
    } catch (e) {
        console.log(e)
        debug(e)
    }
})