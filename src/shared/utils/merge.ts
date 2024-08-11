import { isObject } from './isObject.ts';

export const merge = (lhs: TObject, rhs: TObject): TObject => {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }

        try {
            if (isObject(rhs[p] as TObject)) {
                rhs[p] = merge(lhs[p] as TObject, rhs[p] as TObject);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
};
