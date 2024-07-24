type TDeepClone = <T extends object>(items: T) => T;

export const deepClone: TDeepClone = <T extends object>(items: T) => {
    let result = Array.isArray(items) ? ([] as unknown[]) : ({} as TObject);
    if (Array.isArray(items)) {
        result = items.map(item =>
            Array.isArray(item) ? deepClone(item) : item
        );
    } else if (
        typeof items === 'object' &&
        items !== null &&
        !Array.isArray(items)
    ) {
        Object.keys(items).forEach(key => {
            if (!key.startsWith('_')) {
                if (typeof (items as TObject)[key] === 'object') {
                    (result as TObject)[key] = deepClone(
                        (items as TObject)[key] as TObject
                    );
                } else (result as TObject)[key] = (items as TObject)[key];
            }
        });
    }

    return result as T;
};
