import { useEffect, useMemo, useState } from 'react';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { transformISOSDatetoInputFormat } from '../../../utils/transformISOSDatetoInputFormat';
import DatePicker from '../../DatePicker/DatePicker';
import { Transaction } from '../../../types/Transaction';
import SumEntryField from '../../SumEntryField/SumEntryField';
import Picker from '../../Picker/Picker';
import TextareaField from '../../TextareaField/TextareaField';
import Button from '../../Button/Button';
import { useEditTransaction } from '../../../hooks/useEditTransaction';
import { useAccounts } from '../../../hooks/useAccounts';
import { useIncomeTypes } from '../../../hooks/useIncomeTypes';
import Loader from '../../Loader/Loader';
import { EditTransactionPayload } from '../../../types/EditTransactionPayload';
import { areObjectsEqualShallow } from '../../../utils/areObjectsEqualShallow';
import { enqueueSnackbar } from 'notistack';

interface IncomeDetailsEditProps {
    transaction: Transaction;
    setIsEditMode: (isEditMode: boolean) => void;
}

function IncomeDetailsEdit({
    setIsEditMode,
    transaction,
}: IncomeDetailsEditProps) {
    const { isMutating, trigger } = useEditTransaction(transaction.id);

    const { accounts } = useAccounts();

    const { incomeTypes: incomeCategories } = useIncomeTypes();

    const [editableDetails, setEditableDetails] =
        useState<EditTransactionPayload>({
            ...transaction,
            accountId: 0,
            categoryId: 0,
        });

    const onDetailsChange = (key: string, value: string | number) => {
        setEditableDetails((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleDiscardChanges = () => {
        setEditableDetails({
            ...transaction,
            accountId: 0,
            categoryId: 0,
        });
        setIsEditMode(false);
    };

    const handleSaveChanges = async () => {
        if (isMutating) return;

        try {
            await trigger({
                ...transaction,
                ...editableDetails,
            } as EditTransactionPayload);
            enqueueSnackbar('Changes saved', { variant: 'success' });
            setIsEditMode(false);
        } catch {
            enqueueSnackbar('Failed to save changes', { variant: 'error' });
        }
    };

    const isSaveButtonDisabled = useMemo(() => {
        return (
            isMutating ||
            areObjectsEqualShallow(
                editableDetails as unknown as Record<string, unknown>,
                transaction as unknown as Record<string, unknown>,
            )
        );
    }, [editableDetails, transaction, isMutating]);

    useEffect(() => {
        if (!transaction || !accounts || !incomeCategories) return;

        setEditableDetails((prev) => ({
            ...prev,
            date: transaction.date,
            amount: transaction.amount,
            accountId: accounts.find(
                (account) => account.label === transaction.accountName,
            )?.value as number,
            description: transaction.description,
            categoryId: incomeCategories.find(
                (category) => category.label === transaction.categoryName,
            )?.value as number,
        }));
    }, [transaction, accounts, incomeCategories]);

    if (!editableDetails) {
        return <Loader />;
    }

    return (
        <div>
            <DatePicker
                value={transformISOSDatetoInputFormat(editableDetails.date)}
                max={getCurrentDate()}
                onChange={(e) => onDetailsChange('date', e.target.value)}
                disabled={isMutating}
            />
            <SumEntryField
                sum={editableDetails.amount}
                disabled={isMutating}
                handleChangeSum={(value) => onDetailsChange('amount', value)}
            />
            <Picker
                label="Account"
                data={accounts}
                value={editableDetails.accountId as number}
                onChange={(value) => onDetailsChange('accountId', value)}
                disabled={isMutating}
            />
            <Picker
                label="Select category"
                data={incomeCategories}
                value={editableDetails.categoryId}
                onChange={(value) => onDetailsChange('categoryId', value)}
                disabled={isMutating}
            />
            <TextareaField
                value={editableDetails.description}
                onChange={(value) => onDetailsChange('description', value)}
                rows={4}
                disabled={isMutating}
            />
            <Button
                label="Save"
                onClick={handleSaveChanges}
                disabled={isSaveButtonDisabled}
            />
            <Button
                label="Discard"
                onClick={handleDiscardChanges}
                disabled={isMutating}
            />
        </div>
    );
}

export default IncomeDetailsEdit;
