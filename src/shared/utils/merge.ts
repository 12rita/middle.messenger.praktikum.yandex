import { isObject } from './isObject.ts';

export const merge = (lhs: TObject, rhs: TObject): TObject => {
    const result: TObject = {};
    console.log({ lhs, rhs });
    Object.keys(rhs).forEach(key => {
        if (lhs[key]) {
            if (isObject(lhs[key] as TObject) && isObject(rhs[key] as TObject))
                result[key] = merge(lhs[key] as TObject, rhs[key] as TObject);
            else result[key] = rhs[key];
        } else result[key] = rhs[key];
    });

    Object.keys(lhs).forEach(key => {
        if (result[key] === undefined) result[key] = lhs[key];
    });
    console.log('2', result);
    return result;
};
