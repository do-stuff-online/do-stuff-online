await loadPyodide();
DSO.startLoad();

await pyodide.loadPackage(['sympy'])

let loader = DSO.localPath + 'langs/jelly-fork/loader.py';
pyodide.runPythonAsync(await (await fetch(loader)).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("jelly-fork", async (code,input,args,output,debug) => {
    try {
        pyodide.globals.get('run')(code, eval(args) || [])
    } catch (e) {
        console.log(e)
        debug(e)
    }
})