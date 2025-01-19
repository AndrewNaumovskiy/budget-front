import { useEffect, useState } from 'react';
import Picker from '../Picker/Picker';
import { Option } from '../../types';
import styles from './IncomeDetailsForm.module.css';

function IncomeDetailsForm() {
    const [typesOfIncome, setTypesOfIncome] = useState<Option[]>([]);

    useEffect(() => {
        const fetchedTypesOfIncome: Option[] = [
            { label: 'Salary', value: 'salary' },
            { label: 'One-time payment', value: 'one-time-payment' },
            { label: 'Obligations', value: 'obligations' },
        ];

        setTypesOfIncome(fetchedTypesOfIncome);
    }, []);

    return (
        <div className={styles.detailForm}>
            <Picker
                data={typesOfIncome}
                label="Type of income"
                onChange={() => {}}
            />
        </div>
    );
}

export default IncomeDetailsForm;
