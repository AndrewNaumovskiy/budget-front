import useSWR from "swr"
import { API_URLs } from "../constants/API_URLs"
import { getFetcher } from "../api/fetchers";
import { useEffect, useState } from "react";
import { Transaction } from "../types/Transaction";
import { Account } from "../types/Account";
import { TransactionType } from "../types/TransactionType";


export const useTransactionById = (id: string) => {
    const { data, isLoading, error } = useSWR(API_URLs.GET_TRANSACTION_BY_ID + id, getFetcher);

    const [transaction, setTransaction] = useState<Transaction>({
        id: 0,
        type: TransactionType.Income,
        date: '',
        amount: 0,
        accountName: Account.None,
        categoryName: '',
        balance: 0,
        description: '',
    });

    useEffect(() => {
        if (data && data.data) {
            const transaction = data.data.transaction;

            const fetchedTransaction: Transaction = {
                id: transaction.id,
                type: transaction.type,
                date: transaction.date,
                amount: transaction.amount,
                accountName: transaction.accountName,
                categoryName: transaction.categoryName,
                balance: transaction.balance,
                description: transaction.description,
            }

            setTransaction(fetchedTransaction);
        }
    }, [data]);

    return { transaction, isLoading, error };
}