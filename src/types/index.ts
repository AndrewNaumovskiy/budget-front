export interface SummeryItem {
    label: string,
    value: string,
    pointColor: string
}

export interface ExpensesByCategories {
    [key: string]: number;
}   