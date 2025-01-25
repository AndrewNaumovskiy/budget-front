import { useState } from 'react';
import Button from '../../components/Button/Button';
import ExpenseDetailsForm from '../../components/ExpenseDetailsForm/ExpenseDetailsForm';
import SumEntryField from '../../components/SumEntryField/SumEntryField';
import styles from './AddExpensesPage.module.css';
import { postFetcher } from '../../api/fetchers';
import { API_URLs } from '../../constants/API_URLs';
import { AddExpensesPayload } from '../../types/AddExpensesPayload';

function ExpensesPage() {
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

    const handleSave = () => {
        if (isSomeValueNull()) {
            return;
        }

        const requestData: AddExpensesPayload = {
            date: new Date().toISOString(),
            accountId: details.accountId,
            amount: sum,
            categoryId: details.subCategoryId,
            description: details.description,
        };

        addExpenseRequest(requestData);
    };

    const addExpenseRequest = async (data: AddExpensesPayload) => {
        await postFetcher(API_URLs.ADD_EXPENSES, data);
    };

    const isSomeValueNull = () => {
        return Object.values(details).some((value) => value === null);
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
