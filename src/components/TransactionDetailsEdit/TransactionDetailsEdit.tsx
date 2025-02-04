import { useCallback, useEffect, useState } from 'react';
import { Transaction } from '../../types/Transaction';
import Picker from '../Picker/Picker';
import styles from './TransactionDetailsEdit.module.css';
import Button from '../Button/Button';
import { useExpenseCategories } from '../../hooks/useExpenseCategories';
import { Option } from '../../types';
import { TransactionType } from '../../types/TransactionType';
import { useIncomeTypes } from '../../hooks/useIncomeTypes';
import { TRANSACTION_TYPES_OPTIONS } from '../../constants/transactionTypeOptions';

interface TransactionDetailsEditProps {
    transaction: Transaction;
    setIsEditMode: (isEditMode: boolean) => void;
}

function TransactionDetailsEdit({
    transaction,
    setIsEditMode,
}: TransactionDetailsEditProps) {
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

        if (+type === TransactionType.Expense) {
            setInitialDataForExpense();
        } else {
            updateSubcategoryOptions(
                +type as TransactionType,
                selectedCategoryId,
            );
        }
    };

    const onDetailsChange = (key: string, value: string | number) => {
        setEditableDetails((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSaveChanges = () => {};

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

    const setInitialDataForExpense = () => {
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

    useEffect(() => {
        if (
            categoriesWithSubcategories.length === 0 ||
            editableDetails.type === TransactionType.Income
        ) {
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

    return (
        <div className={styles.editContainer}>
            <Picker
                label="Transaction Type"
                data={TRANSACTION_TYPES_OPTIONS}
                value={editableDetails.type}
                onChange={handleChangeType}
            />
            {isCategoryPickerShown ? (
                <Picker
                    label="Select category"
                    data={categories}
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                />
            ) : null}
            <Picker
                label="Select subcategory"
                data={subcategoryOptions}
                value={editableDetails.categoryName}
                onChange={(value) => onDetailsChange('categoryName', value)}
            />
            <Button label="Save" onClick={handleSaveChanges} />
            <Button label="Discard" onClick={handleDiscardChanges} />
        </div>
    );
}

export default TransactionDetailsEdit;
