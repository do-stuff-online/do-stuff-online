from __python_utils__ import load_files_from_github

async def main():
    await load_files_from_github("zoomlogo/flax", "main", r"flax/.*\.py")
    
    from flax.main import flax_run
    from flax.common import flax_print
    
    global run
    def run(code, args):
        args = args.to_py()
        flax_print(flax_run(code, *args))
