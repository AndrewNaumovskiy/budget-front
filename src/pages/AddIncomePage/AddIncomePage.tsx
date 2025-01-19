import Button from '../../components/Button/Button';
import IncomeDetailsForm from '../../components/IncomeDetailsForm/IncomeDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddIncomePage.module.css';

function AddIncomePage() {
    return (
        <div className={styles.addIncomeContainer}>
            <SumEntryField />
            <IncomeDetailsForm />
            <Button label="Save" onClick={() => {}} />
        </div>
    );
}

export default AddIncomePage;
