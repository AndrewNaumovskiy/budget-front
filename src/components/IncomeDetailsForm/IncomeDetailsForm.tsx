import { useState } from 'react';
import Picker from '../Picker/Picker';
import styles from './IncomeDetailsForm.module.css';
import TextareaField from '../TextareaField/TextareaField';
import { useAccounts } from '../../hooks/useAccounts';
interface IncomeDetailsFormProps {
    onDetailsChange: (field: string, value: string | number) => void;
    details: {
        incomeTypeId: number;
        accountId: number;
        description: string;
    };
}

function IncomeDetailsForm({
    onDetailsChange,
    details,
}: IncomeDetailsFormProps) {
    const { accounts } = useAccounts();

    const [desc, setDesc] = useState('');

    const handleChangeDesc = (value: string) => {
        setDesc(value);
    };

    return (
        <div className={styles.detailForm}>
            {/* <Picker
                data={typesOfIncome}
                value={details.incomeTypeId}
                label="Type of income"
                onChange={() => {}}
            /> */}
            <Picker
                label="Select account"
                data={accounts}
                value={details.accountId}
                onChange={(value) =>
                    onDetailsChange('accountId', Number(value))
                }
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
