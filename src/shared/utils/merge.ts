import { isObject } from './isObject.ts';

export const merge = (obj1: TObject, obj2: TObject): TObject => {
    const result = { ...obj1 };
    // console.log({ obj1, obj2 });
    Object.keys(obj2).forEach(key => {
        if (isObject(obj1[key] as TObject) && isObject(obj2[key] as TObject)) {
            // Recursively merge nested objects
            result[key] = merge(obj1[key] as TObject, obj2[key] as TObject);
        } else if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            // Concatenate arrays
            result[key] = [...obj2[key]];
        } else {
            // Add new key from obj2
            result[key] = obj2[key];
        }
    });
    // console.log({ result });

    return result;
};
