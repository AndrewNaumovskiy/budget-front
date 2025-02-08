import useSWR from 'swr';
import { Transaction } from '../../types/Transaction';
import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './RecentTransactionsList.module.css';
import { API_URLs } from '../../constants/API_URLs';
import { getFetcher } from '../../api/fetchers';
import { useEffect, useState } from 'react';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';
import { enqueueSnackbar } from 'notistack';

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

    const getDate = (fullDate: string) => {
        const date = new Date(fullDate);

        return `${date.getHours()}:${String(date.getMinutes()).padStart(
            2,
            '0',
        )} ${date.toLocaleString('en-US', {
            month: 'long',
        })} ${date.getDate()}`;
    };

    const parseDataToRecentTransactions = (data: Transaction[]) => {
        const updatedData = data.map((transaction) => {
            return {
                ...transaction,
                date: getDate(transaction.date),
            };
        });

        setRecentTransactions(updatedData);
    };

    useEffect(() => {
        if (data) {
            parseDataToRecentTransactions(data.data.transactions);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    if (isLoading) {
        return null;
    }

    if (error) {
        enqueueSnackbar('Failed to load recent transactions', {
            variant: 'error',
        });

        return <SomethingWentWrong />;
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
