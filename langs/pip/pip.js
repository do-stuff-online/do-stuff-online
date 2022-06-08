await loadPyodide();
DSO.startLoad();
let files = (await (await fetch('/langs/pip/all.txt')).text()).split`\n`.filter(x => x);
console.log(files)

pyodide.runPython(`
import sys
sys.path.append('./')
print(sys.path)
from js import fetch`)

let promises = [];
for (let file of files) {
    promises.push(
        pyodide.runPythonAsync(`
text = await fetch('https://raw.githubusercontent.com/dloscutoff/pip/master/${file}')
text = await text.text()
with open('${file}', "w") as f:
    f.write(text)
    `))
}

Promise.all(promises).then(_ => {
    console.log('files written')
    pyodide.runPython(`import pip`)
    DSO.endLoad();
})

DSO.defineMode("pip", async (code,input,args,output,debug) => {
    let argstring = args + ' ' + input;
    try {
        pyodide.runPython(`pip.pip(${py_repr(code)},${py_repr(argstring)})`)
    } catch (e) {
        console.log(e)
        debug(e)
    }
})