await loadPyodide()
DSO.startLoad()
await pyodide.loadPackage("micropip");
await pyodide.runPythonAsync(`
import micropip
await micropip.install('vyxal-2.6', keep_going = True)
from vyxal.main import execute_vyxal
print(execute_vyxal('1 2 +'))`);
DSO.endLoad();
console.log('vyxal.js loaded')
DSO.defineMode('vyxal', async (code, input, args, output, debug) => {
    try {
        pyodide.runPython(`from vyxal.main import execute_vyxal\nexecute_vyxal(${py_repr(code)},${py_repr(args + 'e')},[${input.split`\n`.map(py_repr).join`,`}])`);
    } catch(e){
        debug(e)
    }
})