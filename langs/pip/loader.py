import sys
sys.path.append('./')
import json
from js import fetch

REPOSITORY = "dloscutoff/pip"
BRANCH = "master"

async def main():
    # Fetch the list of files in the repository
    # All necessary files for Pip are at top level, so don't use the recursive option
    filetree = await fetch(f"https://api.github.com/repos/{REPOSITORY}/git/trees/{BRANCH}")
    filetree = json.loads(await filetree.text())
    # Fetch the appropriate files from that list
    for file in filetree["tree"]:
        # Only consider files, not directories
        if file["type"] == "blob":
            filepath = file["path"]
            # Load all Python files and also the Tao of Pip
            if filepath.endswith(".py") or filepath == "Tao of Pip.txt":
                text = await fetch(f"https://raw.githubusercontent.com/{REPOSITORY}/{BRANCH}/{filepath}")
                text = await text.text()
                with open(file["path"], "w") as f:
                    f.write(text)
    
    global runpip
    from pip import run as runpip
