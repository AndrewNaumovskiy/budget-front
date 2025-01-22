import { useEffect, useState } from 'react';
import styles from './ExpenseDetailsForm.module.css';
import { Option } from '../../types';
import Picker from '../Picker/Picker';
import TextareaField from '../TextareaField/TextareaField';
import { useCategories } from '../../hooks/useCategories';
import useSWR from 'swr';
import { API_URLs } from '../../constants/API_URLs';
import { getFetcher } from '../../api/fetchers';
import useAddExpensesStore from '../../state/stores/addExpensesStore';
import { CategoryWithSubCategories } from '../../types/CategoryWithSubCategories';
import { useSubCategories } from '../../hooks/useSubCategories';

interface ExpenseDetailsFormProps {
    onDetailsChange: (field: string, value: string) => void;
    details: {
        category: string;
        subCategory: string;
        paymentMethod: string;
        account: string;
        description: string;
    };
}
function ExpenseDetailsForm({
    details,
    onDetailsChange,
}: ExpenseDetailsFormProps) {
    const { data } = useSWR(
        API_URLs.GET_CATEGORIES_AND_SUB_CATEGORIES,
        getFetcher,
    );

    const {
        setCategoriesWithSubCategories,
        setCategories,
        setSubCategories,
        categoriesWithSubcategories,
    } = useAddExpensesStore();

    const categories = useCategories();
    const subCategories = useSubCategories();

    const [paymentMethods, setPaymentMethods] = useState<Option[]>([]);

    const [accounts, setAccounts] = useState<Option[]>([]);

    const handleCategoryChange = (value: string) => {
        onDetailsChange('category', value);

        setAppropriateSubCategories(value);
    };

    const setAppropriateSubCategories = (value: string) => {
        const category = categories.find(
            (category) => category.value === value,
        );

        if (!category) return;

        const appropriateSubCategories = categoriesWithSubcategories.find(
            (categoryWithSubCategories) =>
                String(categoryWithSubCategories.id) === category.value,
        )?.subCategories;

        if (!appropriateSubCategories) return;

        const updatedSubCategories: Option[] = appropriateSubCategories.map(
            (subCategory) => ({
                label: subCategory.name,
                value: String(subCategory.id),
            }),
        );

        setSubCategories(updatedSubCategories);
        onDetailsChange('subCategory', updatedSubCategories[0].value);
    };

    useEffect(() => {
        if (data) {
            setCategoriesWithSubCategories(data.data.categories);

            const fetchedCategories: Option[] = data.data.categories.map(
                (category: CategoryWithSubCategories) => ({
                    label: category.name,
                    value: String(category.id),
                }),
            );

            setCategories(fetchedCategories);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (categories.length > 0) {
            handleCategoryChange(categories[0].value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories]);

    useEffect(() => {
        const fetchedPaymentMethods: Option[] = [
            { label: 'Cash', value: 'cash' },
            { label: 'Credit card', value: 'credit_card' },
        ];

        setPaymentMethods(fetchedPaymentMethods);
    }, []);

    useEffect(() => {
        if (details.paymentMethod === 'credit_card') {
            const fetchedAccounts: Option[] = [
                { label: 'PrivatBank', value: 'privat_bank' },
                { label: 'Monobank', value: 'monobank' },
            ];

            setAccounts(fetchedAccounts);
        }
    }, [details.paymentMethod]);

    return (
        <div className={styles.detailForm}>
            <Picker
                label="Select category"
                data={categories}
                value={details.category}
                onChange={handleCategoryChange}
            />
            <Picker
                label="Select subcategory"
                data={subCategories}
                value={details.subCategory}
                onChange={(value) => onDetailsChange('subCategory', value)}
            />
            <Picker
                label="Select payment method"
                data={paymentMethods}
                value={details.paymentMethod}
                onChange={(value) => onDetailsChange('paymentMethod', value)}
            />
            {details.paymentMethod === 'credit_card' ? (
                <Picker
                    label="Select account"
                    data={accounts}
                    value={details.account}
                    onChange={(value) => onDetailsChange('account', value)}
                />
            ) : null}
            <TextareaField
                label="Description"
                value={details.description}
                onChange={(value) => onDetailsChange('description', value)}
            />
        </div>
    );
}

export default ExpenseDetailsForm;
