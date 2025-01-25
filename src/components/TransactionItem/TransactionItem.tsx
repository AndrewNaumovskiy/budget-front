import { Transaction } from '../../types/Transaction';
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa6';
import styles from './TransactionItem.module.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { ACCOUNT_LOGOS } from '../../constants/accountLogos';
import { truncateString } from '../../utils/truncateString';
import React from 'react';

interface TransactionItemProps {
    transaction: Transaction;
}

const TRANSACTION_ICONS = {
    0: <FaArrowDown size={20} color="green" />,
    1: <FaArrowUp size={20} color="red" />,
    2: <React.Fragment />,
};

function TransactionItem({ transaction }: TransactionItemProps) {
    const navigate = useNavigate();

    const handleNavigateToTransactionDetails = () => {
        navigate(`${ROUTES.TRANSACTION_DETAILS.route}/${transaction.id}`);
    };

    return (
        <div
            className={styles.transactionItem}
            onClick={handleNavigateToTransactionDetails}
        >
            {TRANSACTION_ICONS[transaction.type]}
            <div className={styles.centralContainer}>
                <div className={styles.amount}>{transaction.amount}</div>
                <div className={styles.time}>{transaction.date}</div>
            </div>
            <div className={styles.container}>
                <div className={styles.category}>
                    {truncateString(transaction.categoryName, 18)}
                </div>
                <div className={styles.account}>
                    <div className={styles.account}>
                        <img
                            src={
                                ACCOUNT_LOGOS[transaction.accountName] ||
                                ACCOUNT_LOGOS.None
                            }
                            alt={`${transaction.accountName} logo`}
                            width={30}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionItem;
