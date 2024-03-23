await loadPyodide();
DSO.startLoad();

pyodide.runPythonAsync(await (await fetch('/langs/pip/loader.py')).text() + '\nawait main()')
.then (() => DSO.endLoad());

DSO.defineMode("pip", async (code,input,args,output,debug) => {
    try {
        window.pythonInput = input.split`\n`
        pyodide.globals.get('runpip')(code, args)
    } catch (e) {
        console.log(e)
        debug(e)
    }
})