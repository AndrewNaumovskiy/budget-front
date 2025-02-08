export interface EditTransactionPayload {
    id: number,
    date: string,
    amount: number,
    accountId: number,
    categoryId: number,
    description: string,
    type: number
}