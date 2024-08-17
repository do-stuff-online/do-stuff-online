from js import fetch, console
import os
import sys
import importlib
import re
import json

# Some modules get messed up for some reason when sys.modules is saved
# and restored unless they're imported here first
import unicodedata
import numbers
import sympy

ORIGINAL_MODULES = sys.modules
sys.path.append("./")

def get_file_tree(repository, branch):
    return fetch(f"https://api.github.com/repos/{repository}/git/trees/{branch}?recursive=true")

async def load_file(repository, branch, file):
    text = await fetch(f"https://raw.githubusercontent.com/{repository}/{branch}/{file}")
    text = await text.text()
    with open(file, "w") as f:
        f.write(text)

async def load_files_from_github(repository, branch, regex):
    # Reset all Python imports
    sys.modules = ORIGINAL_MODULES.copy()
    importlib.invalidate_caches()
    # Go back to the Pyodide top directory
    os.chdir("/home/pyodide")
    lang_directory = repository
    if os.path.isdir(lang_directory):
        # This language has already been loaded; don't load it again
        os.chdir(lang_directory)
    else:
        # Create a directory for the language
        os.makedirs(lang_directory)
        os.chdir(lang_directory)
        console.log(os.getcwd())
        # Get a JSON object with the filenames from GitHub
        filetree = json.loads(await (await get_file_tree(repository, branch)).text())
        console.log(json.dumps(filetree))
        # Create all files that match the filename regex
        for file in filetree["tree"]:
            if file["type"] == "blob":
                filepath = file["path"]
                if re.match(regex, filepath):
                    # Create subdirectories as necessary
                    subdirectory = os.path.dirname(filepath)
                    if subdirectory:
                        os.makedirs(subdirectory, exist_ok=True)
                    await load_file(repository, branch, filepath)
