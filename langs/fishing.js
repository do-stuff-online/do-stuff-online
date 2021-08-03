DSO.defineMode('fishing',(code,input,args,output,debug) => {
    let x = 0, y = 0, dir = 0, stack = [''], codebox = code.split`\n`, castlength = 0, cell = 0, castdir = 0, textmode = false,inputs = input.split`\n`.map(z=>+z==+z?+z:z), pop = _ => inputs.push(_ = inputs.shift())&&_;
    const dock_chars = 'CD|_[]<^>v?!=+-';
    while(dock_chars.includes(codebox[y][x])){
        let char = codebox[y][x]
        if(char == '+') castlength++;
        if(char == '-') castlength--;
        if(char == '>') castdir = 0
        if(char == 'v') castdir = 1
        if(char == '<') castdir = 2
        if(char == '^') castdir = 3
        if(char == '[') dir = 0
        if(char == '_') dir = 1
        if(char == ']') dir = 2
        if(char == '|') dir = 3
        if(char == '?'){
            if(stack[cell] && stack[cell+1] && stack[cell+1] == stack[cell]){
                if(codebox[y+1] && codebox[y+1][x] && codebox[y+1][x] == '='){
                    y++;
                    dir = 1; 
                } else if(codebox[y-1] && codebox[y-1][x] && codebox[y-1][x] == '='){
                    y--;
                    dir = 3;
                } else if(codebox[y] && codebox[y][x-1] && codebox[y][x-1] == '='){
                    x--;
                    dir = 2;
                } else if(codebox[y] && codebox[y][x+1] && codebox[y][x+1] == '='){
                    x++;
                    dir = 0;
                } 
            } else {
                if(codebox[y+1] && codebox[y+1][x] && codebox[y+1][x] == '!'){
                    y++;
                    dir = 1; 
                } else if(codebox[y-1] && codebox[y-1][x] && codebox[y-1][x] == '!'){
                    y--;
                    dir = 3;
                } else if(codebox[y] && codebox[y][x-1] && codebox[y][x-1] == '!'){
                    x--;
                    dir = 2;
                } else if(codebox[y] && codebox[y][x+1] && codebox[y][x+1] == '!'){
                    x++;
                    dir = 0;
                } 
            }
        }
        if(char == 'C'){
            let fishx = x,fishy = y;
            if(castdir == 0) fishx += castlength
            if(castdir == 1) fishy += castlength
            if(castdir == 2) fishx -= castlength
            if(castdir == 3) fishy -= castlength
            if(codebox[fishy] && codebox[fishy][fishx]){
                let fish = codebox[fishy][fishx];
                console.log(stack,fish,'erg')
                if(fish == '`') textmode = !textmode
                if(textmode && fish != '`'){
                    stack[cell] += fish;
                } else {
                    if(fish == 'P') output(stack[cell])
                    if(fish == 'N') output(stack[cell] + '\n')
                    if(fish == 'n') stack[cell] = +stack[cell]
                    if(fish == 'I') stack[cell] = pop()
                    if(fish == '{') if(!stack[++cell]) stack[cell] = ''
                    if(fish == '}') if(!stack[--cell]) stack.unshift(cell = 0);
                    if(fish == 'E') stack[cell] = ''
                    if(fish == 'r') stack[cell] = [...stack[cell]+''].reverse().join``;
                    if(fish == 'i') stack[cell] += 1;
                    if(fish == 'd') stack[cell] -= 1;
                    if(fish == 'S') stack[cell] **= 2;
                    if('asmDp'.includes(fish)){
                        let left = stack[cell], right = stack[cell+1] == undefined ? 0 : stack[cell+1], res = 0
                        if(fish == 'a') res = left + right
                        if(fish == 's') res = left - right
                        if(fish == 'm') res = left * right
                        if(fish == 'D') res = left / right
                        if(fish == 'p') res = left ** right
                        stack[cell] = res;
                    }
                    if(fish == 'l') stack.push(stack.length)
                    if(fish == 'n') stack[cell] = -stack[cell];
                    if(fish == 's') stack.push(...stack[cell])
                    if(fish == 'c') stack.push(stack[cell] + (stack[cell+1] || ''))
                }
            }
        }
        if(dir == 0) x++;
        if(dir == 1) y++;
        if(dir == 2) x--;
        if(dir == 3) y--;
        if(!(codebox[y] && codebox[y][x])) break;
    }
})