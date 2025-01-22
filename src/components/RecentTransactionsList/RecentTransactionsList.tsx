import useSWR from 'swr';
import { Transaction } from '../../types/Transaction';
import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './RecentTransactionsList.module.css';
import { API_URLs } from '../../constants/API_URLs';
import { getFetcher } from '../../api/fetchers';
import { useEffect, useState } from 'react';
import { getTime } from '../../utils/getTime';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

function RecentTransactionsList() {
    const { data, isLoading, error } = useSWR(
        API_URLs.GET_RECENT_TRANSACTIONS,
        getFetcher,
        {
            shouldRetryOnError: false,
        },
    );

    const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
        [],
    );

    const parseDataToRecentTransactions = (data: Transaction[]) => {
        const updatedData = data.map((transaction) => {
            return {
                id: transaction.id,
                type: transaction.type,
                categoryName: transaction.categoryName,
                amount: transaction.amount,
                accountName: transaction.accountName,
                date: getTime(transaction.date),
            };
        });

        setRecentTransactions(updatedData);
    };

    useEffect(() => {
        if (data) {
            parseDataToRecentTransactions(data.data.transactions);
        }
    }, [data]);

    if (isLoading) {
        return null;
    }

    if (error) {
        return (
            <SomethingWentWrong title="Failed to load recent transactions" />
        );
    }

    return (
        <>
            <h3>Recent Transactions</h3>
            <div className={styles.recentTransactionsList}>
                {recentTransactions.map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                    />
                ))}
            </div>
        </>
    );
}

export default RecentTransactionsList;
