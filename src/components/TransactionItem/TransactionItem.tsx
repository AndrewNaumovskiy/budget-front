import { Transaction } from '../../types/Transaction';
import { FaArrowUp } from 'react-icons/fa';
import { FaArrowDown } from 'react-icons/fa6';
import styles from './TransactionItem.module.css';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';

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
                <FaArrowDown color="#007a57" />
            ) : (
                <FaArrowUp color="#c70039" />
            )}
            <div className={styles.amount}>${transaction.amount}</div>
            <div className={styles.category}>{transaction.category}</div>
        </div>
    );
}

export default TransactionItem;
