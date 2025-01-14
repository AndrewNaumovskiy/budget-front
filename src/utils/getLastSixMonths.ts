export function getLastSixMonths() {
    const months = [];
    for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        months.push(date.toLocaleString('default', { month: 'long' }));
    }
    return months.reverse();
}