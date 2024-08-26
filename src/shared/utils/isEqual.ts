import { isObject } from './isObject.ts';
import { isEqualArrays } from './isEqualArrays.ts';

type TIsEqual = (
    a?: object | string | number,
    b?: object | string | number
) => boolean;

export const isEqual: TIsEqual = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    if (typeof a !== typeof b) return false;
    if (typeof a === 'number' || typeof b === 'number') return a === b;
    if (typeof a === 'string' && typeof b === 'string') {
        return a === b;
    } else if (typeof a === 'string' || typeof b === 'string') return false;

    if (Array.isArray(a) && Array.isArray(b)) {
        return isEqualArrays(a, b);
    }

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
