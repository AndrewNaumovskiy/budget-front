export const getTime = (date: string) => {
    const time = new Date(date);
    return `${time.getHours() < 10 ? '0' : ''}${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
}