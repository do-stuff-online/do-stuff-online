import sys
sys.path.append('./')
from js import fetch, location

import os
os.mkdir("jelly")

async def main():
    files = await fetch(location.origin + location.pathname + "langs/jelly/all.txt")
    files = await files.text()
    for file in files.splitlines():
        text = await fetch('https://raw.githubusercontent.com/DennisMitchell/jellylanguage/master/jelly/' + file)
        text = await text.text()
        with open('jelly/' + file, "w") as f:
            f.write(text)
    
    from jelly import code_page, main, try_eval

    global run
    def run(code, args):
        args = list(map(try_eval, args or []))
        result = main(code, args, end='')
        print(str(result)[:-4])