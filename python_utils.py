from js import fetch, console
import re
import json

def get_file_tree(repository, branch):
    return fetch(f"https://api.github.com/repos/{repository}/git/trees/{branch}?recursive=true")

async def load_file(repository, branch, file):
    text = await fetch(f"https://raw.githubusercontent.com/{repository}/{branch}/{file}")
    text = await text.text()
    with open(file, "w") as f:
        f.write(text)

async def load_files_from_github(repository, branch, regex):
    filetree = json.loads(await (await get_file_tree(repository, branch)).text())
    console.log(json.dumps(filetree))
    for file in filetree["tree"]:
        if file["type"] == "blob":
            filepath = file["path"]
            if re.match(regex, filepath):
                await load_file(repository, branch, filepath)