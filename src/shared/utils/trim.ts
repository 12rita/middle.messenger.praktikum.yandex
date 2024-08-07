export const trim = (str: string, symbols?: string) => {
    if (!symbols || symbols === ' ') {
        console.log(str);
        return str.trim();
    }
    const symMap = new Map();

    symbols.split('').forEach(sym => symMap.set(sym, true));
    let start = 0,
        end = str.length - 1;
    while (start <= end) {
        const sym1 = str[start];
        const sym2 = str[end];
        if (symMap.has(sym1)) {
            start++;
        }
        if (symMap.has(sym2)) {
            end--;
        }
        if (!symMap.has(sym1) && !symMap.has(sym2)) break;
    }
    console.log({ start, end });
    console.log(str.slice(start, end + 1));
    return str.slice(start, end + 1);
};
