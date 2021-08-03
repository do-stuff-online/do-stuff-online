var fieldSeparator = "\xff";
var startOfExtraFields = "\xfe";

var TIO = {


    run:
    async function run(code, input, lang) {
        const encoder = new TextEncoder("utf-8");
        var length = encoder.encode(code).length;
        var iLength = encoder.encode(input).length;
        //  Vlang\u00001\u0000{language}\u0000F.code.tio\u0000{# of bytes in code}\u0000{code}F.input.tio\u0000{length of input}\u0000{input}Vargs\u0000{number of ARGV}{ARGV}\u0000R
        var rBody = "Vlang\x001\x00" + lang + "\x00F.code.tio\x00" + length + "\x00" + code + "F.input.tio\x00" + iLength + "\x00" + input + "Vargs\x000\x00R";
        rBody = encode(rBody);
        var fetched = await fetch("https://tio.run/cgi-bin/run/api/", {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: rBody
        });
        var read = (await fetched.body.getReader().read()).value;
        var text = new TextDecoder('utf-8').decode(read);
        return text.slice(16).split(text.slice(0, 16));
    },


    makeLink:
    function makeLink(languageId, header = "", code = "", footer = "", input = "", args = [], options = [], fullLink = true) {

        var stateString = languageId;

        var saveTextArea = function(textArea) {
            stateString += fieldSeparator + textToByteString(textArea);
        };

        [header, code, footer, input, ...args].forEach(saveTextArea);

        if (options.length) {
            stateString += startOfExtraFields + "options";

            options.forEach(saveTextArea);
        }
        // TODO: This default arg isn't working for some reason
        return (fullLink? "https://tio.run/##": "") +
            //byteStringToBase64(byteArrayToByteString(deflate(byteStringToByteArray(stateString))));
            arrToB64(deflate(byteStringToByteArray(stateString)));
    },


    parseLink:
    function parseLink(link) {
        if  (link.slice(0,18) === "https://tio.run/##") {
            link = link.slice(18);
        }

        var stateString = byteArrayToByteString(inflate(b64ToArr(link)));

        var fields = stateString.split(startOfExtraFields);
        var fields = fields.map(n=>n.split(fieldSeparator));

        var [languageId, header, code, footer, input, ...args] = fields[0];
        [header, code, footer, input, ...args] = [header, code, footer, input, ...args].map(n=>byteStringToText(n));
        var options = [];

        if (fields.length > 1) {
            options = fields[1].slice(1);
        }

        return {
            "languageId": languageId,
            "header": header,
            "code": code,
            "footer": footer,
            "input": input,
            "args": args,
            "options": options
        }
    },


};
