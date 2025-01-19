import { useNavigate } from 'react-router';
import styles from './AddExpensesButton.module.css';
import { ROUTES } from '../../../constants/routes';

function AddExpensesButton() {
    const navigate = useNavigate();

    const handleNavigateToAddEntryPage = () => {
        navigate(ROUTES.ADD_ENTRY.route);
    };

    return (
        <div
            className={styles.centerButtonContainer}
            onClick={handleNavigateToAddEntryPage}
        >
            <div className={styles.bottomContainer}></div>
            <button className={styles.centerButton}>+</button>
        </div>
    );
}

export default AddExpensesButton;
