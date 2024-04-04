import sys
sys.path.append('./')
import json
from js import fetch
from __python_utils__ import load_files_from_github

async def main():
    await load_files_from_github("dloscutoff/pip", "master", r"[^/]*\.py|Tao of Pip.txt")
    
    global runpip
    from pip import run as runpip
