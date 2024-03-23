import sys
sys.path.append('./')
from js import fetch

async def main():
    files = await fetch("/langs/pip/all.txt")
    files = await files.text()
    for file in files.split('\n')[:-1]:
        text = await fetch('https://raw.githubusercontent.com/dloscutoff/pip/master/' + file)
        text = await text.text()
        with open(file, "w") as f:
            f.write(text)
    
    global runpip
    from pip import run as runpip