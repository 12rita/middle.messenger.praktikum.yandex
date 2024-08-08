import { isObject } from './isObject.ts';

type TIsEqual = (a: object | string, b?: object | string) => boolean;

export const isEqual: TIsEqual = (a, b) => {
    if (!b) return true;
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    if (typeof a === 'string' && typeof b === 'string') {
        return a === b;
    } else if (typeof a === 'string' || typeof b === 'string') return false;

    return Object.keys(a).every(key => {
        if (!(key in b)) return false;
        if (typeof (a as TObject)[key] !== typeof (b as TObject)[key])
            return false;
        if (
            isObject((a as TObject)[key] as TObject) &&
            isObject((b as TObject)[key] as TObject)
        )
            return isEqual(
                (a as TObject)[key] as TObject,
                (b as TObject)[key] as TObject
            );
        else return (a as TObject)[key] === (b as TObject)[key];
    });
};
