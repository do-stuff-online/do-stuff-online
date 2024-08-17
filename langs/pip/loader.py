from __python_utils__ import load_files_from_github

async def main():
    await load_files_from_github("dloscutoff/pip", "master", r"[^/]*\.py|Tao of Pip.txt")
    
    from pip import run as runpip
    
    global runpip
