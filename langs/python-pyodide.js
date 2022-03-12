loadPyodide()
DSO.defineMode('python-pyodide', async (code, input, args, output, debug) => {
    try {
        window.pythonInput = input.split`\n`
        pyodide.loadPackagesFromImports(code);
        pyodide.runPython(`exec(${py_repr(code)}, {})`);
    } catch(e){
        debug(e)
    }
})