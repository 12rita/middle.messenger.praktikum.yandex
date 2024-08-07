import { isObject } from './isObject.ts';

export const isEqual = (a: object, b: object): boolean => {
    if (Object.keys(a).length !== Object.keys(b).length) return false;

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
