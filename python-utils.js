async function loadPyodide(){
    await import('https://cdn.jsdelivr.net/pyodide/v0.19.0/full/pyodide.js')
    window.pythonInput = []
    if(!window.pyodide){
        DSO.startLoad();
        let time = Date.now()
        let pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.19.0/full/",
            stdin: _ => pythonInput.shift() ?? eval('throw "out of input"'),
            stdout: str => $('output').value += str + '\n',
            stderr: str => $('debug').value += str + '\n'
        })
        console.log('python (pyodide) loaded in %d seconds', (Date.now() - time) / 1000)
        window.pyodide = pyodide
        DSO.endLoad();
    }
}
function py_repr(str){
    return `"${str.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/"/g,'\\"')}"`
}