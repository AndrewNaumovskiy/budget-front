import TransactionDetails from '../../components/TransactionDetails/TransactionDetails';
import styles from './TransactionDetailsPage.module.css';

function TransactionDetailsPage() {
    return (
        <div className={styles.transactionDetailsContainer}>
            <h2>Now you can view/edit your transaction</h2>
            <TransactionDetails />
        </div>
    );
}

export default TransactionDetailsPage;
