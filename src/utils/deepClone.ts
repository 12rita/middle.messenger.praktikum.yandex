export const deepClone = items => {
    let result = Array.isArray(items) ? [] : {};
    if (typeof items === 'object' && items !== null) {
        Object.keys(items).forEach(key => {
            if (!key.startsWith('_')) {
                if (typeof items[key] === 'object') {
                    result[key] = deepClone(items[key]);
                } else result[key] = items[key];
            }
        });
    }
    if (Array.isArray(items)) {
        result = items.map(item =>
            Array.isArray(item) ? deepClone(item) : item
        );
    }
    return result;
};
