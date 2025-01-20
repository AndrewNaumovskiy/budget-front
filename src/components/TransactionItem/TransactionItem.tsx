import { Transaction } from '../../types/Transaction';
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa6';
import styles from './TransactionItem.module.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';
import { ACCOUNT_LOGOS } from '../../constants/accountLogos';

interface TransactionItemProps {
    transaction: Transaction;
}

function TransactionItem({ transaction }: TransactionItemProps) {
    const navigate = useNavigate();

    const handleNavigateToTransactionDetails = () => {
        console.error(`${ROUTES.TRANSACTION_DETAILS.route}/${transaction.id}`);
        navigate(`${ROUTES.TRANSACTION_DETAILS.route}/${transaction.id}`);
    };

    return (
        <div
            className={styles.transactionItem}
            onClick={handleNavigateToTransactionDetails}
        >
            {transaction.type === 'income' ? (
                <FaArrowDown color="#007a57" size={20} />
            ) : (
                <FaArrowUp color="#c70039" size={20} />
            )}
            <div className={styles.centralContainer}>
                <div className={styles.amount}>${transaction.amount}</div>
                <div className={styles.time}>{transaction.time}</div>
            </div>
            <div className={styles.container}>
                <div className={styles.category}>{transaction.category}</div>
                <div className={styles.account}>
                    <div className={styles.account}>
                        <img
                            src={ACCOUNT_LOGOS[transaction.account]}
                            alt={`${transaction.account} logo`}
                            width={30}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionItem;
