import { useState } from 'react';
import Button from '../../components/Button/Button';
import IncomeDetailsForm from '../../components/IncomeDetailsForm/IncomeDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddIncomePage.module.css';

function AddIncomePage() {
    const [sum, setSum] = useState(0);
    const [details, setDetails] = useState({
        incomeTypeId: -1,
        accountId: -1,
        description: '',
    });

    const handleDetailsChange = (field: string, value: string | number) => {
        setDetails((prev) => ({ ...prev, [field]: value }));
    };

    const handleChangeSum = (value: number) => {
        setSum(value);
    };

    const handleSave = () => {};

    return (
        <div className={styles.addIncomeContainer}>
            <SumEntryField sum={sum} handleChangeSum={handleChangeSum} />
            <IncomeDetailsForm
                onDetailsChange={handleDetailsChange}
                details={details}
            />
            <Button label="Save" onClick={handleSave} />
        </div>
    );
}

export default AddIncomePage;
