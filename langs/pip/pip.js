await loadPyodide();

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
text = await fetch('/langs/pip/${file}')
text = await text.text()
with open('${file}', "w") as f:
    f.write(text)
    `))
}

Promise.all(promises).then(_ => setTimeout(() => {
    console.log('files written')
    pyodide.runPython(`import pip`)
}, 1500))

DSO.defineMode("pip", async (code,input,args,output,debug) => {
    let argstring = args + ' ' + input;
    try {
        pyodide.runPython(`pip.pip(${py_repr(code)},${py_repr(argstring)})`)
    } catch (e) {
        console.log(e)
        debug(e)
    }
})