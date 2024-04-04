import sys
sys.path.append('./')
from __python_utils__ import load_files_from_github

import os
os.mkdir("jelly")

async def main():
    await load_files_from_github("cairdcoinheringaahing/jellylanguage", "master", r"jelly/.*\.py")
    
    from jelly import code_page, main, try_eval

    global run
    def run(code, args):
        args = list(map(try_eval, args or []))
        result = main(code, args, end='')
        print(str(result)[:-4])