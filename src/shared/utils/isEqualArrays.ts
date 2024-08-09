import { isEqual } from '@shared/utils/isEqual.ts';

type TIsEqualArrays = (arr1: object[], arr2: object[]) => boolean;

export const isEqualArrays: TIsEqualArrays = (arr1, arr2) => {
    return (
        arr1.length === arr2.length &&
        arr1.every(element_1 =>
            arr2.some(element_2 => isEqual(element_1, element_2))
        )
    );
};
