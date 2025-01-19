import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import { ROUTES } from '../../constants/routes';
import styles from './AddEntryPage.module.css';

function AddEntryPage() {
    const navigate = useNavigate();

    const handleNavigateToExpense = () => {
        navigate(ROUTES.ADD_EXPENSES.route);
    };

    const handleNavigateToIncome = () => {
        navigate(ROUTES.ADD_INCOME.route);
    };

    return (
        <div className={styles.buttonContainer}>
            <Button label="Add Income" onClick={handleNavigateToIncome} />
            <Button label="Add Expense" onClick={handleNavigateToExpense} />
        </div>
    );
}

export default AddEntryPage;
