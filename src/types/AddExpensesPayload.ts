export interface AddExpensesPayload {
    date: string;
    accountId: number;
    amount: number;
    categoryId: number;
    subCategoryId: number;
    description: string;
}