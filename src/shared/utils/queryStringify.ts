export const queryStringify = (data: XMLHttpRequestBodyInit) => {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }
    const dataWithStringKeys = data as unknown as { [key: string]: string };
    const keys = Object.keys(dataWithStringKeys);
    return keys.reduce((result, key, index) => {
        const value = dataWithStringKeys[key];

        return `${result}${key}=${value}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
};
