await loadPyodide();
DSO.startLoad();

await pyodide.loadPackage(['sympy'])

pyodide.runPythonAsync(await (await fetch('/langs/jelly-fork/loader.py')).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("jelly-fork", async (code,input,args,output,debug) => {
    try {
        pyodide.globals.get('run')(code, eval(args) || [])
    } catch (e) {
        console.log(e)
        debug(e)
    }
})