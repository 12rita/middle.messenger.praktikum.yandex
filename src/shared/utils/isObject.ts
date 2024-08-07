export const isObject = (obj: TObject): boolean =>
    (typeof obj === 'object' && obj !== null) || Array.isArray(obj);
