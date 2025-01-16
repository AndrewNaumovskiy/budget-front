import { TransactionType } from "./TransactionType";

export interface Transaction {
    id: number;
    type: TransactionType;
    category: string;
    amount: number;
}