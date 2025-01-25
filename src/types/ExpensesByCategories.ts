
export interface ExpensesByCategories {
    [categoryName: string]: {
        amount: number;
        percentage: number;
    }
}   