import { useState } from 'react';
import Button from '../../components/Button/Button';
import IncomeDetailsForm from '../../components/IncomeDetailsForm/IncomeDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddIncomePage.module.css';
import { isSumInvalid } from '../../utils/isSumInvalid';
import { enqueueSnackbar } from 'notistack';
import useSWRMutation from 'swr/mutation';
import { API_URLs } from '../../constants/API_URLs';
import { postFetcher } from '../../api/fetchers';
import { AddIncomePayload } from '../../types/AddIncomePayload';

function AddIncomePage() {
    const { trigger } = useSWRMutation(
        API_URLs.ADD_INCOME,
        (url, { arg }: { arg: AddIncomePayload }) => postFetcher(url, arg),
    );

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

    const handleSave = async () => {
        if (isSumInvalid(sum)) {
            enqueueSnackbar('Sum is invalid', { variant: 'error' });
            return;
        }

        const requestData = {
            date: new Date().toISOString(),
            accountId: details.accountId,
            amount: sum,
            categoryId: details.incomeTypeId,
            description: details.description,
        };

        try {
            await trigger(requestData);
            alert('Expense added successfully!');
            enqueueSnackbar('Income was added!', { variant: 'success' });
            clearForm();
        } catch {
            enqueueSnackbar('Failed to add income', { variant: 'error' });
        }
    };

    const clearForm = () => {
        setSum(0);
        setDetails({
            ...details,
            description: '',
        });
    };

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
