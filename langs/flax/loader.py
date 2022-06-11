import sys
sys.path.append('./')
from js import fetch

import os
os.mkdir("flax")

async def main():
    files = await fetch("/langs/flax/all.txt")
    files = await files.text()
    for file in files.split('\n')[:-1]:
        text = await fetch('https://raw.githubusercontent.com/pygamer0/flax/master/flax/' + file)
        text = await text.text()
        with open('flax/' + file, "w") as f:
            f.write(text)

    from flax.main import flax_run
    global run
    def run(code, args):
        flax_run(code, args.to_py())