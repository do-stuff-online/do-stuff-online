loadPyodide()
DSO.defineMode('python-pyodide', async (code, input, args, output, debug) => {
    try {
        window.pythonInput = input.split`\n`
        pyodide.loadPackagesFromImports(code);
        pyodide.runPython(`
import os
os.chdir("/home/pyodide")
exec(${py_repr(code)}, {})
`);
    } catch(e){
        debug(e)
    }
})