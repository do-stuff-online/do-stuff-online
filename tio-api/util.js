function deflate(arr) {
    return pako.deflateRaw(arr, {
        "level": 9
    });
}

function inflate(arr) {
    return pako.inflateRaw(arr);
}

function encode(str) {
    var bytes = new TextEncoder("utf-8").encode(str);
    return deflate(bytes);
}

function arrToB64(arr) {
    var bytestr = "";
    arr.forEach(c => bytestr += String.fromCharCode(c));
    return btoa(bytestr).replace(/\+/g, "@").replace(/=+/, "");
}

function b64ToArr(str) {
    return new Uint8Array([...atob(decodeURIComponent(str).replace(/@/g, "+"))].map(c => c.charCodeAt()))
}

function byteStringToByteArray(byteString) {
    var byteArray = new Uint8Array(byteString.length);
    for(var i = 0; i < byteString.length; i++)
        byteArray[i] = byteString.charCodeAt(i);
    byteArray.head = 0;
    return byteArray;
}

function textToByteString(string) {
    return window.unescape(window.encodeURIComponent(string));
}

function byteStringToText(string){
    return window.decodeURIComponent(window.escape(string));
}

function byteArrayToByteString(byteArray) {
    var retval = "";
    byteArray.forEach(function(byte) {
        retval += String.fromCharCode(byte);
    });
    return retval;
}

function byteStringToBase64(byteString) {
    return window.btoa(byteString).replace(/\+/g, "@").replace(/=+/, "");
}
