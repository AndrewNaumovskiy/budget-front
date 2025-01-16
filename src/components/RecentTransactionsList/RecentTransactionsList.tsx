import { Transaction } from '../../types/Transaction';
import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './RecentTransactionsList.module.css';

function RecentTransactionsList() {
    const RECENT_TRANSACTIONS: Transaction[] = [
        {
            id: 1,
            type: 'expense',
            category: 'Shopping',
            amount: 100,
        },
        {
            id: 2,
            type: 'expense',
            category: 'Food',
            amount: 300,
        },
        {
            id: 3,
            type: 'income',
            category: 'Salary',
            amount: 2000,
        },
        {
            id: 4,
            type: 'income',
            category: 'Transfer',
            amount: 500,
        },
        {
            id: 5,
            type: 'expense',
            category: 'Health',
            amount: 400,
        },
    ];

    return (
        <>
            <h3>Recent Transactions</h3>
            <div className={styles.recentTransactionsList}>
                {RECENT_TRANSACTIONS.map((transaction) => (
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
