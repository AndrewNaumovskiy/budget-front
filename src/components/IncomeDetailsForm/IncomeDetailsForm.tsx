import { useEffect, useState } from 'react';
import Picker from '../Picker/Picker';
import { Option } from '../../types';
import styles from './IncomeDetailsForm.module.css';
import TextareaField from '../TextareaField/TextareaField';

function IncomeDetailsForm() {
    const [desc, setDesc] = useState('');
    const [typesOfIncome, setTypesOfIncome] = useState<Option[]>([]);

    const handleChangeDesc = (value: string) => {
        setDesc(value);
    };

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
            <TextareaField
                label="Description"
                value={desc}
                onChange={handleChangeDesc}
            />
        </div>
    );
}

export default IncomeDetailsForm;
