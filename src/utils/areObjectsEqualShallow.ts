export const areObjectsEqualShallow = (obj1: Record<string, unknown>, obj2: Record<string, unknown>) => {
    for (const key in obj1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}