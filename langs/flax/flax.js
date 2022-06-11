DSO.startLoad();
await loadPyodide();

pyodide.loadPackage(['mpmath', 'more-itertools'])

pyodide.runPythonAsync(await (await fetch('/langs/flax/loader.py')).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("flax", async (code,input,args,output,debug) => {
    try {
        pyodide.globals.get('run')(code, eval(args) || [])
    } catch (e) {
        console.log(e)
        debug(e)
    }
})