import { TransactionType } from "../types/TransactionType";

export const CorrespondingTransactionType: { [key in TransactionType]: string } = {
    [TransactionType.Income]: "Income",
    [TransactionType.Expense]: "Expense",
    [TransactionType.TransferFrom]: "Transfer from",
    [TransactionType.TransferTo]: "Transfer to",
    [TransactionType.Savings]: "Savings",
} as const;