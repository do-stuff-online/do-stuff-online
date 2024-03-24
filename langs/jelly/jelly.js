await loadPyodide();
DSO.startLoad();

let loader = location.origin + location.pathname + 'langs/jelly/loader.py';
pyodide.runPythonAsync(await (await fetch(loader)).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("jelly", async (code,input,args,output,debug) => {
    try {
        pyodide.globals.get('run')(code, eval(args) || [])
    } catch (e) {
        console.log(e)
        debug(e)
    }
})