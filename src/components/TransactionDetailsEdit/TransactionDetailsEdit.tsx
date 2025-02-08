import { useCallback, useEffect, useMemo, useState } from 'react';
import { Transaction } from '../../types/Transaction';
import Picker from '../Picker/Picker';
import styles from './TransactionDetailsEdit.module.css';
import Button from '../Button/Button';
import { useExpenseCategories } from '../../hooks/useExpenseCategories';
import { Option } from '../../types';
import { TransactionType } from '../../types/TransactionType';
import { useIncomeTypes } from '../../hooks/useIncomeTypes';
import { TRANSACTION_TYPES_OPTIONS } from '../../constants/transactionTypeOptions';
import SumEntryField from '../SumEntryField/SumEntryField';
import TextareaField from '../TextareaField/TextareaField';
import DatePicker from '../DatePicker/DatePicker';
import { transformISOSDatetoInputFormat } from '../../utils/transformISOSDatetoInputFormat';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { useEditTransaction } from '../../hooks/useEditTransaction';
import { enqueueSnackbar } from 'notistack';
import { areObjectsEqualShallow } from '../../utils/areObjectsEqualShallow';

interface TransactionDetailsEditProps {
    transaction: Transaction;
    setIsEditMode: (isEditMode: boolean) => void;
}

function TransactionDetailsEdit({
    transaction,
    setIsEditMode,
}: TransactionDetailsEditProps) {
    const { data, error, isMutating, trigger } = useEditTransaction(
        transaction.id,
    );

    const { categoriesWithSubcategories, categories } = useExpenseCategories();
    const { incomeTypes } = useIncomeTypes();

    const [isCategoryPickerShown, setIsCategoryPickerShown] = useState(
        transaction.type === TransactionType.Expense,
    );

    const [editableDetails, setEditableDetails] = useState({
        type: transaction.type,
        categoryName: transaction.categoryName,
        amount: transaction.amount,
        accountName: transaction.accountName,
        date: transaction.date,
        description: transaction.description,
    });

    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    const getSubcategoryOptions = useCallback(
        (type: TransactionType, categoryId: number): Option[] => {
            if (type === TransactionType.Income) {
                return incomeTypes;
            }

            const selectedCategory = categoriesWithSubcategories.find(
                (category) => category.id === categoryId,
            );

            return selectedCategory
                ? selectedCategory.subCategories.map((sub) => ({
                      value: sub.id,
                      label: sub.name,
                  }))
                : [];
        },
        [categoriesWithSubcategories, incomeTypes],
    );

    const [subcategoryOptions, setSubcategoryOptions] = useState<Option[]>(
        getSubcategoryOptions(transaction.type, selectedCategoryId),
    );

    const updateSubcategoryOptions = (
        type: TransactionType,
        categoryId: number,
    ) => {
        const options = getSubcategoryOptions(type, categoryId);

        setSubcategoryOptions(options);
        onDetailsChange('categoryName', options[0]?.value || '');
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategoryId(Number(categoryId));
        updateSubcategoryOptions(editableDetails.type, Number(categoryId));
    };

    const handleChangeType = (type: string) => {
        onDetailsChange('type', +type);
        setIsCategoryPickerShown(+type === TransactionType.Expense);

        updateSubcategoryOptions(+type as TransactionType, selectedCategoryId);
    };

    const onDetailsChange = (key: string, value: string | number) => {
        setEditableDetails((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSaveChanges = () => {
        trigger({
            id: transaction.id,
            date: editableDetails.date,
            amount: editableDetails.amount,
            accountId: 1,
            categoryId: +editableDetails.categoryName,
            description: editableDetails.description,
            type: editableDetails.type,
        });
    };

    const handleDiscardChanges = () => {
        setEditableDetails({
            type: transaction.type,
            categoryName: transaction.categoryName,
            amount: transaction.amount,
            accountName: transaction.accountName,
            date: transaction.date,
            description: transaction.description,
        });
        setIsEditMode(false);
    };

    const setDefaultDataForExpense = () => {
        const initialCategory = categoriesWithSubcategories[0];

        setSelectedCategoryId(initialCategory?.id || 0);

        const initialSubCategories =
            initialCategory?.subCategories.map((sub) => ({
                value: sub.name,
                label: sub.name,
            })) || [];

        setSubcategoryOptions(initialSubCategories);
        onDetailsChange('categoryName', initialSubCategories[0]?.value);
    };

    const setInitialDataForExpense = () => {
        const selectedCategory = categoriesWithSubcategories.find((category) =>
            category.subCategories.some(
                (sub) => sub.name === editableDetails.categoryName,
            ),
        );

        if (!selectedCategory) {
            return;
        }

        setSelectedCategoryId(selectedCategory.id);

        const subCategories = selectedCategory.subCategories.map((sub) => ({
            value: sub.name,
            label: sub.name,
        }));

        setSubcategoryOptions(subCategories);
    };

    const isSaveButtonDisabled = useMemo(() => {
        return (
            isMutating ||
            areObjectsEqualShallow(
                editableDetails,
                transaction as unknown as Record<string, unknown>,
            )
        );
    }, [editableDetails, isMutating, transaction]);

    useEffect(() => {
        if (
            categoriesWithSubcategories.length === 0 ||
            editableDetails.type === TransactionType.Income
        ) {
            setDefaultDataForExpense();
            return;
        }

        setInitialDataForExpense();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoriesWithSubcategories]);

    useEffect(() => {
        if (
            editableDetails.type === TransactionType.Income &&
            incomeTypes.length
        ) {
            setIsCategoryPickerShown(false);
            setSubcategoryOptions(incomeTypes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomeTypes]);

    useEffect(() => {
        if (error) {
            enqueueSnackbar('Failed to save changes', { variant: 'error' });
        }
    }, [error]);

    useEffect(() => {
        if (data) {
            enqueueSnackbar('Changes saved', { variant: 'success' });
            setTimeout(() => {
                setIsEditMode(false);
            }, 1500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className={styles.editContainer}>
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
                label="Transaction Type"
                data={TRANSACTION_TYPES_OPTIONS}
                value={editableDetails.type}
                onChange={handleChangeType}
                disabled={isMutating}
            />
            {isCategoryPickerShown ? (
                <Picker
                    label="Select category"
                    data={categories}
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                    disabled={isMutating}
                />
            ) : null}
            <Picker
                label="Select subcategory"
                data={subcategoryOptions}
                value={editableDetails.categoryName}
                onChange={(value) => onDetailsChange('categoryName', value)}
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

export default TransactionDetailsEdit;
