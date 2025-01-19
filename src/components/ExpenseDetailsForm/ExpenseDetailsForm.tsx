/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import styles from './ExpenseDetailsForm.module.css';
import { Option, SubCategory } from '../../types';
import Picker from '../Picker/Picker';

function ExpenseDetailsForm() {
    const [categories, setCategories] = useState<Option[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory>({});

    const [selectedSubCategoryData, setSelectedSubCategoryData] = useState<
        Option[]
    >([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const [selectedSubCategory, setSelectedSubCategory] = useState<
        string | null
    >(null);

    const [paymentMethods, setPaymentMethods] = useState<Option[]>([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
        string | null
    >(null);

    const [accounts, setAccounts] = useState<Option[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    const handleChangeCategory = (category: string) => {
        setSelectedCategory(category);
    };

    const handleChangeSubCategoriesData = (category: string) => {
        setSelectedSubCategoryData(
            subCategories[category]?.subCategories || [],
        );
    };

    const handleChangeSubCategory = (subCategory: string) => {
        setSelectedSubCategory(subCategory);
    };

    const handleAccountChange = (account: string) => {
        setSelectedAccount(account);
    };

    useEffect(() => {
        const fetchedCategories: Option[] = [
            { label: 'Food', value: 'food' },
            { label: 'Transport', value: 'transport' },
        ];

        const fetchedSubCategories: SubCategory = {
            food: {
                subCategories: [
                    { label: 'Groceries', value: 'groceries' },
                    { label: 'Restaurants', value: 'restaurants' },
                ],
            },
            transport: {
                subCategories: [
                    { label: 'Public transport', value: 'public_transport' },
                    { label: 'Taxi', value: 'taxi' },
                ],
            },
        };

        const fetchedPaymentMethods: Option[] = [
            { label: 'Cash', value: 'cash' },
            { label: 'Credit card', value: 'credit_card' },
        ];

        setPaymentMethods(fetchedPaymentMethods);
        setCategories(fetchedCategories);
        setSubCategories(fetchedSubCategories);

        if (fetchedCategories.length > 0) {
            const initialCategory = fetchedCategories[0].value;
            setSelectedCategory(initialCategory);
            setSelectedSubCategoryData(
                fetchedSubCategories[initialCategory]?.subCategories || [],
            );
            if (
                fetchedSubCategories[initialCategory]?.subCategories.length > 0
            ) {
                setSelectedSubCategory(
                    fetchedSubCategories[initialCategory]?.subCategories[0]
                        .value,
                );
            }
        }

        if (fetchedPaymentMethods.length > 0) {
            setSelectedPaymentMethod(fetchedPaymentMethods[0].value);
        }
    }, []);

    useEffect(() => {
        handleChangeSubCategoriesData(selectedCategory as string);
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedPaymentMethod === 'credit_card') {
            const fetchedAccounts: Option[] = [
                { label: 'PrivatBank', value: 'privat_bank' },
                { label: 'Monobank', value: 'monobank' },
            ];

            setAccounts(fetchedAccounts);
        }
    }, [selectedPaymentMethod]);

    return (
        <div className={styles.detailForm}>
            <Picker
                label="Select category"
                data={categories}
                onChange={handleChangeCategory}
            />
            <Picker
                label="Select subcategory"
                data={selectedSubCategoryData}
                onChange={handleChangeSubCategory}
            />
            <Picker
                label="Select payment method"
                data={paymentMethods}
                onChange={setSelectedPaymentMethod}
            />
            {selectedPaymentMethod === 'credit_card' ? (
                <Picker
                    label="Select account"
                    data={accounts}
                    onChange={handleAccountChange}
                />
            ) : null}
        </div>
    );
}

export default ExpenseDetailsForm;
