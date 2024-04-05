from __python_utils__ import load_files_from_github

import os
os.mkdir("lib")
os.mkdir("lib/core")

async def main():
    await load_files_from_github("dloscutoff/tinylisp2", "main", r"[^/]*\.py|lib/.*\.tl")
    
    global run_tl2
    from run import run_program
    from tinylisp2 import parse_args
    def run_tl2(code, args):
        if isinstance(args, str):
            # Simplistically parse command-line args by splitting on whitespace
            args = args.split()
        run_program(code, options=parse_args(args))
