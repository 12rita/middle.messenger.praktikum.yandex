import { merge } from '@shared/utils/merge.ts';

export const set = (
    object: TObject | unknown,
    path: string,
    value: unknown
): TObject | unknown => {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<TObject>(
        (acc, key) => ({
            [key]: acc
        }),
        value as TObject
    );

    return merge(object as TObject, result);
};
