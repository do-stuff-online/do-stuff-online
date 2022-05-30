let console;
export function runCode (flags, codez, input, output) {
    console = {
        log: v => output(v + '\n')
    }
    charmode = 0
    samelinemode = 0
    stringmode = 0
    if (flags.includes('s')) {
        charmode = 0
    } else if (flags.includes('c')) {
        charmode = 1
        samelinemode = 1
    } else if (flags.includes('e')) {
        samelinemode = 1
        stringmode = 1
    } else if (flags.includes('l')) {
        charmode = 1
    }
    code = codez
    run(...input)
}
  
  function run(){
    if(!code){
      err = "Error: Tried to run undefined code"
      return err
    }
    halt = 0
    err = ""
    line = ""
    code = code.toString()
    codearr = code.split(".")
    code = codearr[0]
    debugn = 0
    outobj = arguments
    while(!halt){
      runhelp(...outobj)
    }
    if(err){return err}
  }
  
  function runhelp(){
    let mat = bracket(code)
    if(mat === -1){
      halt = 1
      err = "Error: Unmatched Loop"
      return
    }
    let at = 0
    let input = 0
    let slot = [0,0,0,0] //out, acc, sto, spc
    let carrychar = 0
    outobj = []
    while(at<code.length){
      switch(code.charAt(at)){
        case "U":
          if(stringmode){
            if(arguments[0]){
              slot[0]=arguments[0].charCodeAt(0)
              arguments[0]=arguments[0].slice(1)
            }else{
              slot[0]=0
            }
            carrychar = slot[0]
          }else{
            if(arguments[input]){
              slot[0]=arguments[input]
            }else{
              if(arguments[input]===""){
                slot[0]=""
              }else{
                slot[0]=0
              }
            }
            input++
          }
          break;
        case "N":
          if(arguments[input]){
            slot[0]=0
          }else{
            if(arguments[input]===0){
              slot[0]=0
            }else{
              slot[0]=1
            }
          }
          break;
        case "D":
          slot[0]=slot[1]
          slot[1]=0
          break;
        case "E":
          stringmode = 0
          if(!((slot[0]<=(codearr.length - 1))&&(slot[0]>=0))){
            debug("error",0,at,slot,arguments,input)
            halt = 1
            err = "Error: E index out of range"
            return
          }
          code = codearr[slot[0]]
          debugn = slot[0]
          return
        case "R":
          if(stringmode){
            slot[0] = carrychar
          }else{
            if(!input){
              debug("error",0,at,slot,arguments,input)
              halt = 1
              err = "Error: Invalid R command"
              return
            }
            if(arguments[input-1]){
              slot[0]=arguments[input-1]
            }else{
              slot[0]=0
            }
          }
          break;
        case "O":
          outobj.push(slot[0])
          break;
        case "P":
          if(samelinemode){
            if((typeof slot[0])=="number"){
              line += String.fromCharCode(slot[0])
            }else{
              line += slot[0]
            }
          }else{
            if(charmode){
              if((typeof slot[0])=="number"){
                console.log(String.fromCharCode(slot[0]))
              }else{
                console.log(slot[0])
              }
            }else{
              console.log(slot[0])
            }
          }
          break;
        case "?":
          if(stringmode){
            debug("debug",1,at,slot,["data: \"" + arguments[0] + "\""],1)
          }else{
            debug("debug",1,at,slot,arguments,input)
          }
          break;
        case "!":
          if(samelinemode){console.log(line)}
          break;
        case "@":
          line = ""
          break;
        case "+":
          slot[0]++
          break;
        case "-":
          slot[0]--
          break;
        case "^":
          slot[1]+=slot[0]
          break;
        case "[":
          slot[2]=slot[0]
          slot[0]=0
          break;
        case "]":
          slot[0]+=slot[2]
          break;
        case "{":
        case ";":
          break;
        case ":":
          while((at<code.length)&&(code.charAt(at)!=";")){
            at++
          }
          break;
        case "(":
          slot[3]=slot[0]
          slot[0]=0
          break;
        case ")":
          if(slot[3]!=slot[0]){
            while((at<code.length)&&(code.charAt(at)!=":")){
              at++
            }
          }
          slot[0]=slot[3]
          break;
        case ">":
          if(slot[0]>slot[3]){
            slot[0]=slot[3]
          }else{
            slot[0]=0
          }
          break;
        case "<":
          if(slot[0]<slot[3]){
            slot[0]=slot[3]
          }else{
            slot[0]=0
          }
          break;
        case "}":
          for(let w=0;w<mat.length;w++){
            if(mat[w][1]==at){
              at = mat[w][0]
              w = mat.length + 1
            }
          }
          break;
        case "¬":
          for(let wait = 0;wait < 25000000;wait++){}
          break;
      }
      if(debugmode){debug("MODE",0,at,slot,arguments,input)}
      at++
    }
    halt = 1
  }
  
  function bracket(str){
    let match = []
    let depth = 0
    for(let i=0;i<str.length;i++){
      if(str.charAt(i)=="{"){
        depth++
        match.push([i,depth])
      }
      if(str.charAt(i)=="}"){
        for(let j=0;j<match.length;j++){
          if(match[j][1]==depth){match[j][1]=i}
        }
        depth--
      }
    }
    if(depth){return -1}
    return match
  }
  
  let outobj = []
  let codearr = []
  let debugn = 0
  let halt = 0
  let err = ""
  let debugmode = 0
  function dm(){
    debugmode = 1 - debugmode
    return debugmode
  }
  let charmode = 0
  let samelinemode = 0
  let stringmode = 0
  let line = ""
  
  function debug(str,off,a,s,r,i){
    if(r[i-1]){
      console.log(str,debugn.toString()+":"+(a-off).toString(),code.charAt(a-off),s,"("+r[i-1].toString()+")")
    }else{
      console.log(str,debugn.toString()+":"+(a-off).toString(),code.charAt(a-off),s,"()")
    }
  }