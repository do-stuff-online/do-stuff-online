const DSO = {
    defineMode(name,run){
        this.modes[name] = run;
        this.activeMode = {
            name: name,
            run: run
        }
    },
    modeList: {},
    modes: {},
    async loadMode(id) {
        if (this.modeList.hasOwnProperty(id)) {
            let mode = this.modeList[id];
            $('select').value = id;
            $('homepage-link').href = mode.link;
            let counter;
            if(!this.modes[id]){
                await import(mode.interpreter);
                if(mode.bytecount){
                    counter = await import(mode.bytecount)
                    mode.bytecount = counter.count
                }
            }
            this.activeMode = {
                id: id,
                ...mode,
                run: this.modes[id]
            }
            if(mode.bytecount){
                this.activeMode.bytecount = mode.bytecount;
                updateByteCount()
            }
        } else {
            // id is blank or isn't a valid language
            if (id) {
                this.langNotFound(id);
            }
            $('select').value = '';
            $('homepage-link').href = '';
            this.activeMode = {id: ''};
        }
    },
    activeMode: {id: ''},
    async run() {
        if (!this.activeMode.run) {
            // No language selected
            $('select').focus();
            return;
        }
        let runButton = $('run-button');
        if(runButton.innerHTML.includes('fa-spin')) return;
        runButton.innerHTML = '<i class="fa fa-cog fa-spin fa-2x"></i>';
        $('output').value = '';
        $('debug').value = '';
        await this.activeMode.run(
            ($('header-code').value ? $('header-code').value + '\n' : '')
            + $('code').value +
            ($('footer').value ? '\n' + $('footer').value : ''),
            $('input').value,
            $('flags').value,
            val => ($('output').value += val, resize($('output'))),
            val => ($('debug').value += val, resize($('debug')))
        )
        runButton.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
        toggle($('output'),true)
        toggle($('debug'),true)
    },
    selectLanguage(hash = location.hash.slice(1)){
        if(hash[0] == '@') {
            let parsed = this.decode(location.hash.slice(2))
            $('header-code').value = parsed[1]
            $('code').value = parsed[2]
            $('footer').value = parsed[3]
            $('input').value = parsed[4]
            $('flags').value = parsed[5]
            DSO.loadMode(parsed[0])
            updateByteCount()
        } else {
            DSO.loadMode(hash);
            location.hash = '#' + hash;
        }
    },
    startLoad(){
        $('lang-loader').style.display = 'inline-block';
    },
    endLoad(){
        $('lang-loader').style.display = 'none';
    },
    langNotFound(lang) {
        console.error(`Language '${lang}' not found.`);
        return "undefined";
    },
    
    makeLink() {
        return location.origin + location.pathname + '#@' + DSO.encode([
            DSO.activeMode.id,
            $('header-code').value,
            $('code').value, 
            $('footer').value, 
            $('input').value, 
            $('flags').value
        ])
    },

    encode(obj) {
        return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
    },

    decode(str) {
        if (str){
            return JSON.parse(decodeURIComponent(escape(atob(str))));
        } else {
            return [];
        }
    },

    localPath: location.origin + (location.pathname.match(/(.*\/)*/)[0] || '/')
}