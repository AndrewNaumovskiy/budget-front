import { useState } from 'react';
import Button from '../../components/Button/Button';
import ExpenseDetailsForm from '../../components/ExpenseDetailsForm/ExpenseDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddExpensesPage.module.css';
import { postFetcher } from '../../api/fetchers';
import { API_URLs } from '../../constants/API_URLs';
import { AddExpensesPayload } from '../../types/AddExpensesPayload';
import useSWRMutation from 'swr/mutation';
import { enqueueSnackbar } from 'notistack';

function ExpensesPage() {
    const { trigger } = useSWRMutation(
        API_URLs.ADD_EXPENSES,
        (url, { arg }: { arg: AddExpensesPayload }) => postFetcher(url, arg),
    );

    const [sum, setSum] = useState(0);
    const [details, setDetails] = useState({
        subCategoryId: -1,
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
        if (isSomeValueNull()) {
            enqueueSnackbar('Some fields are incorrect', { variant: 'error' });
            return;
        }

        if (isSumInvalid()) {
            enqueueSnackbar('Sum is invalid', { variant: 'error' });
            return;
        }

        const requestData: AddExpensesPayload = {
            date: new Date().toISOString(),
            accountId: details.accountId,
            amount: sum,
            categoryId: details.subCategoryId,
            description: details.description,
        };

        try {
            await trigger(requestData);
            alert('Expense added successfully!');
            enqueueSnackbar('Expense was added!', { variant: 'success' });
            clearForm();
        } catch {
            enqueueSnackbar('Failed to add expense', { variant: 'error' });
        }
    };

    const clearForm = () => {
        setSum(0);
        setDetails({
            ...details,
            description: '',
        });
    };

    const isSomeValueNull = () => {
        return Object.values(details).some(
            (value) => value === null || value === -1,
        );
    };

    const isSumInvalid = () => {
        return sum <= 0;
    };

    return (
        <div className={styles.addExpensesContainer}>
            <SumEntryField sum={sum} handleChangeSum={handleChangeSum} />
            <ExpenseDetailsForm
                onDetailsChange={handleDetailsChange}
                details={details}
            />
            <Button label="Save" onClick={handleSave} />
        </div>
    );
}

export default ExpensesPage;
