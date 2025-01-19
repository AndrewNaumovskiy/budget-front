import Button from '../../components/Button/Button';
import ExpenseDetailsForm from '../../components/ExpenseDetailsForm/ExpenseDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddExpensesPage.module.css';

function ExpensesPage() {
    return (
        <div className={styles.addExpensesContainer}>
            <SumEntryField />
            <ExpenseDetailsForm />
            <Button label="Save" onClick={() => {}} />
        </div>
    );
}

export default ExpensesPage;
