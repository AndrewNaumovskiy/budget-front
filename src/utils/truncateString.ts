export const truncateString = (str: string, length: number = 120) => {
    return str.length > length ? str.slice(0, length) + '...' : str;
}