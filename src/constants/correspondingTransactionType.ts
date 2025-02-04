import { TransactionType } from "../types/TransactionType";

export const CorrespondingTransactionType: { [key in TransactionType]: string } = {
    [TransactionType.Income]: "Income",
    [TransactionType.Expense]: "Expense",
    [TransactionType.Transfer]: "Transfer"
} as const;