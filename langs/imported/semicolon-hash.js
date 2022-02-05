DSO.defineMode('semicolon-#',function interpreter(code,_input,_args,output,_debug){
    acc = 0
    for (let x of code) {
      if (x == ';') {
        acc++
      }
      if (x == '#') {
        k = String.fromCharCode(acc % 127)
        output(k)
        acc = 0
      }
    }
})