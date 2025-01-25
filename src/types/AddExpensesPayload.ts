export interface AddExpensesPayload {
    date: string;
    accountId: number;
    amount: number;
    categoryId: number;
    description: string;
}