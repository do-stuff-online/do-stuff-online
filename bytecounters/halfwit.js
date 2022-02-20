export function count(code) {
    let count = 0;
    for(let byte of code) {
        if('[M{;+*><JNfb:$?k'.includes(byte)) count += .5;
        else if('e/|(%EnSilFR_}r'.includes(byte)) count += 1;
        else if('0123456789sZDW,.'.includes(byte)) count += 1.5;
    }
    return count
}