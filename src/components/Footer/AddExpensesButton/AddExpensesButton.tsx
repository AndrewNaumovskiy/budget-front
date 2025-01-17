import { useNavigate } from 'react-router';
import styles from './AddExpensesButton.module.css';
import { ROUTES } from '../../../constants/routes';

function AddExpensesButton() {
    const navigate = useNavigate();

    const handleNavigateToAddExpensesPage = () => {
        navigate(ROUTES.ADD_EXPENSES.route);
    };

    return (
        <div
            className={styles.centerButtonContainer}
            onClick={handleNavigateToAddExpensesPage}
        >
            <div className={styles.bottomContainer}></div>
            <button className={styles.centerButton}>+</button>
        </div>
    );
}

export default AddExpensesButton;
