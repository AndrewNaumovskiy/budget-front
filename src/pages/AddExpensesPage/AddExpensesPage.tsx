import ExpenseDetailsForm from '../../components/ExpenseDetailsForm/ExpenseDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddExpensesPage.module.css';

function ExpensesPage() {
    return (
        <div className={styles.addExpensesContainer}>
            <SumEntryField />
            <ExpenseDetailsForm />
            <button className={styles.saveButton}>Save</button>
        </div>
    );
}

export default ExpensesPage;
