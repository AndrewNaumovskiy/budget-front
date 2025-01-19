import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddExpensesPage.module.css';

function ExpensesPage() {
    return (
        <div className={styles.addExpensesContainer}>
            <SumEntryField />
        </div>
    );
}

export default ExpensesPage;
