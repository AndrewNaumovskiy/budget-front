import { useEffect, useState } from 'react';
import styles from './ExpenseDetailsForm.module.css';
import { Option } from '../../types';
import Picker from '../Picker/Picker';
import TextareaField from '../TextareaField/TextareaField';
import { useExpenseCategories } from '../../hooks/useExpenseCategories';
import useAddExpensesStore from '../../state/stores/addExpensesStore';
import { useSubCategories } from '../../hooks/useSubCategories';
import { useAccounts } from '../../hooks/useAccounts';

interface ExpenseDetailsFormProps {
    onDetailsChange: (field: string, value: string | number) => void;
    details: {
        subCategoryId: number;
        accountId: number;
        description: string;
    };
}

function ExpenseDetailsForm({
    details,
    onDetailsChange,
}: ExpenseDetailsFormProps) {
    const [selectedCategory, setSelectedCategory] = useState<number>(-1);

    const { setSubCategories, categoriesWithSubcategories } =
        useAddExpensesStore();

    const { categories } = useExpenseCategories();
    const subCategories = useSubCategories();
    const { accounts } = useAccounts();

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(+value);

        setAppropriateSubCategories(+value);
    };

    const setAppropriateSubCategories = (value: number) => {
        const category = categories.find(
            (category) => category.value === value,
        );

        if (!category) return;

        const appropriateSubCategories = categoriesWithSubcategories.find(
            (categoryWithSubCategories) =>
                categoryWithSubCategories.id === category.value,
        )?.subCategories;

        if (!appropriateSubCategories) return;

        const updatedSubCategories: Option[] = appropriateSubCategories.map(
            (subCategory) => ({
                label: subCategory.name,
                value: subCategory.id,
            }),
        );

        setSubCategories(updatedSubCategories);
        onDetailsChange('subCategoryId', updatedSubCategories[0].value);
    };

    useEffect(() => {
        if (categories.length > 0) {
            handleCategoryChange(String(categories[0].value));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    useEffect(() => {
        if (accounts.length > 0) {
            onDetailsChange('accountId', accounts[0].value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accounts]);

    return (
        <div className={styles.detailForm}>
            <Picker
                label="Select category"
                data={categories}
                value={selectedCategory}
                onChange={handleCategoryChange}
            />
            <Picker
                label="Select subcategory"
                data={subCategories}
                value={details.subCategoryId}
                onChange={(value) => onDetailsChange('subCategoryId', value)}
            />

            <Picker
                label="Select payment method"
                data={accounts}
                value={details.accountId}
                onChange={(value) =>
                    onDetailsChange('accountId', Number(value))
                }
            />
            <TextareaField
                label="Description"
                value={details.description}
                onChange={(value) => onDetailsChange('description', value)}
            />
        </div>
    );
}

export default ExpenseDetailsForm;
