const $ = x => document.getElementById(x)
fetch('./langs.json')
.then(x => x.json())
.then(value => modeList = value)
.then(value => {
    for(key in value){
        let option = document.createElement('option');
        option.value = key;
        option.innerText = value[key].name;
        $('select').appendChild(option);
    }
})
.then(() => DSO.selectLanguage())
.then(() => {
    for(let i of ['header', 'code', 'footer','input', 'flags'] ){
        if($(i).value) toggle($(i),1)
    }
    if(!$('code').value) toggle($('code', 1))
})
function init(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            var panel = this.nextElementSibling;
            var disp = panel.style.display;
            if (disp === "block") {
                this.classList.remove("active");
                panel.style.display = "none";
            } else {
                this.classList.add("active");
                panel.style.display = "block";
            }
        });
        acc[i].click()
        acc[i].click()
    }
    window.toggle = (elem,open=0) => {
        var panel = elem.previousElementSibling;
        var disp = elem.style.display;
        if(open){
            panel.classList.add("active");
            elem.style.display = "block";
            resize(elem)
            return;
        }
        if (disp === "none") {
            panel.classList.add("active");
            elem.style.display = "block";
            resize(elem)
        } else {
            panel.classList.remove("active");
            elem.style.display = "none";
        }
    }
    window.resize = (elem) => {
        elem.style.height = "";
        elem.style.height = elem.scrollHeight - 4 + "px";
    }
    [...document.querySelectorAll('p.accordion+textarea')].map(elem => {
        elem.addEventListener('input',_ => resize(elem))
        elem.addEventListener('change',_ => resize(elem))
    });
    window.addEventListener('resize', _ => {
        [...document.querySelectorAll('p.accordion+textarea')].map(resize);
    })
    $('code').addEventListener('input', updateByteCount)
    $('code').addEventListener('change', updateByteCount)
    updateByteCount()
    window.addEventListener('keydown', e => {
        if(e.ctrlKey || e.metaKey){
            if(e.key == 'Enter'){
                e.preventDefault();
                DSO.run();
            }
        }
    })
}
window.addEventListener('load',init)
function createLink(type){
    let link = DSO.makeLink();
    if(type == 'markdown'){
        link = `[Try It Online!](${link})`
    } else if(type == 'codegolf'){
        link = `# [${DSO.activeMode.name}](${DSO.activeMode.link}), ${getByteCount()} byte${getByteCount() == 1 ? '' : 's'}\n` + 
        `\`\`\`\n${$('code').value}\n\`\`\`\n`+
        `[Try It Online!](${link})`
    } else if(type == 'html'){
        link = `<a href="${link}">Try It Online!</a>`
    }
    $('output').value = link;
    toggle($('output'), 1)
}
function getByteCount(){
    let text = $('code').value
    if(DSO.activeMode.bytecount){
        return DSO.activeMode.bytecount(text)
    } else {
        return new Blob([text]).size
    }
}
function updateByteCount(){
    $('bytecount').innerText = getByteCount();
    $('s').innerText = getByteCount() == 1 ? '' : 's'
}