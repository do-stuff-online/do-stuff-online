import 'https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js'
let pythonInput = []
if(!window.pyodide){
    DSO.startLoad();
    let time = Date.now()
    let pyodide = await loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
        stdin: _ => pythonInput.shift() ?? eval('throw "out of input"'),
        stdout: str => $('output').value += str,
        stderr: str => $('debug').value += str
    })
    console.log('python (pyodide) loaded in %d seconds', (Date.now() - time) / 1000)
    window.pyodide = pyodide
    DSO.endLoad();
}
DSO.defineMode('python-pyodide', async (code, input, args, output, debug) => {
    function py_repr(str){
        return `"${str.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/"/g,'\\"')}"`
    }
    pythonInput = input.split`\n`
    pyodide.runPython(`exec(${py_repr(code)})`);
})