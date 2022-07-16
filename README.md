# do-stuff-online
A TIO clone, pretty much.

Except it's JS only because I can't afford a server.

If you want your language added, open an issue and provide links to the homepage and main interpreter.

## Build

Step 1: Don't.

All you need is a basic http server (I recommend `npx http-server .`) and you're good to go! DSO lazily loads interpreters, mostly from external sources to use the latest version, so the download size is around 400KB, 300ish of which is the font.
