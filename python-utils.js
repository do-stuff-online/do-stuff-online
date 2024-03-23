async function loadPyodide(){
    await import('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js')
    window.pythonInput = [];
    try {
        if (!window.pyodide) {
            DSO.startLoad();
            let time = Date.now()
            let decoder = new TextDecoder();
            let pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
            })
            pyodide.setStdin({
                stdin: () => pythonInput.shift()
                // Once pythonInput is empty, shift() returns undefined,
                // which Pyodide treats as EOF
            });
            pyodide.setStdout({
                write: buf => {
                    $('output').value += decoder.decode(buf);
                    return buf.length;
                }
            });
            pyodide.setStderr({
                write: buf => {
                    $('debug').value += decoder.decode(buf);
                    return buf.length;
                }
            });
            console.log('python (pyodide) loaded in %d seconds', (Date.now() - time) / 1000)
            window.pyodide = pyodide
            DSO.endLoad();
        }
    } catch (e) {
        console.log(e)
    }
}
function py_repr(str){
    return `"${str.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/"/g,'\\"')}"`
}