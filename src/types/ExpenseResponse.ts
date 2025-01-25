export interface ExpenseResponse {
    id: number,
    type: number,
    date: string,
    amount: number,
    description: string,
    accountName: string,
    categoryName: string,
    balance: number
}