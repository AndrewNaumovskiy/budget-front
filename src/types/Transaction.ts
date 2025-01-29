import { Account } from "./Account";
import { TransactionType } from "./TransactionType";

export interface Transaction {
    id: number;
    type: TransactionType;
    categoryName: string;
    amount: number;
    accountName: Account;
    date: string;
    description: string;
    balance: number;
}