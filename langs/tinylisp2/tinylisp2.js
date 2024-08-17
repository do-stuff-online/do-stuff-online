await loadPyodide();
DSO.startLoad();

let loader = DSO.localPath + 'langs/tinylisp2/loader.py';
pyodide.runPythonAsync(await (await fetch(loader)).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("tinylisp2", async (code,input,args,output,debug) => {
    try {
        pyodide.globals.get('run_tl2')(code, args)
    } catch (e) {
        console.log(e)
        debug(e)
    }
})
