fetch('https://raw.githubusercontent.com/Radvylf/rSNBATWPL/main/rsnbatwpl.js').then(x => x.text()).then(text => {
    let require =  (pkg) => {
        if (pkg == "util")
            return {
                inspect: (data) => {
                    var stringify = (data, circular = []) => {
                        var circf = circular.find(c => c == data);
    
                        if (circf)
                            return "[Circular]";
    
                        if (data == null)
                            return null;
    
                        if (typeof data == "bigint")
                            return String(data) + "n";
                        if (typeof data == "number" || typeof data == "string" || typeof data == "boolean")
                            return JSON.stringify(data);
                        if (typeof data == "function")
                            return "[Fuction]";
    
                        var ind = (str, count) => str.split("\n").map(s => " ".repeat(count) + s).join("\n");
                        
                        if (Array.isArray(data)) {
                            var dcopy = [];
    
                            for (var x of data)
                                dcopy.push(stringify(x, [...circular, data]));
    
                            if (dcopy.some(d => d.includes("\n")) || dcopy.reduce((s, y) => s + y.length + 2, 0) > 80)
                                return "[\n" + dcopy.map(d => ind(d, 2)).join(",\n") + "\n]";
                            
                            return "[ " + dcopy.join(", ") + " ]";
                        }
    
                        if (data instanceof Map) {
                            var dcopy = [];
    
                            for (var x of data)
                                dcopy.push([JSON.stringify(x[0]), stringify(x[1], [...circular, data])]);
                            
                            if (dcopy.some(d => d[1].includes("\n")) || dcopy.reduce((s, y) => s + y[0].length + y[1].length + 6, 0) > 80)
                                return "Map(" + dcopy.length + ") {\n" + dcopy.map(d => ind(d[0] + " => " + d[1], 2)).join(",\n") + "\n}";
    
                            return "Map(" + dcopy.length + ") { " + dcopy.map(d => d[0] + " => " + d[1]).join(", ") + " }";
                        }
    
                        var dcopy = [];
    
                        for (var x in data)
                            dcopy.push([JSON.stringify(x), stringify(data[x], [...circular, data])]);
    
                        if (dcopy.some(d => d[1].includes("\n")) || dcopy.reduce((s, y) => s + y[0].length + y[1].length + 4, 0) > 80)
                            return "{\n" + dcopy.map(d => ind(d[0] + ": " + d[1], 2)).join(",\n") + "\n}";
    
                        return "{ " + dcopy.map(d => d[0] + ": " + d[1]).join(", ") + " }";
                    };
                    
                    return stringify(data);
                }
            };
    };
    module = {
        exports: {}
    };
    (Function('require', 'module',text))(require, module);
    window.rsnbatwpl = module.exports;
})
DSO.defineMode('raisin-batwaffle', async (code,input,args,output,debug) => {
    try {
        let {prints, out} = await rsnbatwpl(code, input.split`\n`.map(v => {
            try {
                return JSON.parse(v)
            } catch {
                return v
            }
        }), null, null, debug, true)
        output(prints+'\n'+out)
    } catch(ex) { 
        debug(ex)
    }
})



var module = {};