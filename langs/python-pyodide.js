loadPyodide();
DSO.defineMode('python-pyodide', async (code, input, args, output, debug) => {
    try {
        pythonInput = input.split`\n`
        pyodide.runPython(`exec(${py_repr(code)})`);
    } catch(e){
        debug(e)
    }
})