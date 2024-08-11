import { isObject } from '@shared/utils/isObject.ts';

export const set = (
    object: TObject | unknown,
    path: string,
    value: unknown
): TObject | unknown => {
    if (!isObject(object as TObject)) return object;
    if (typeof path !== 'string') throw new Error('path must be string');
    let result: TObject = object as TObject;
    path.split('.').forEach((key, idx, array) => {
        console.log({ result, key });
        if (idx === array.length - 1) {
            result[key] = value;
        } else {
            result[key] = {};
            result = (object as TObject)[key] as TObject;
        }
    });
    console.log({ object, path, result });
    return object;
};
