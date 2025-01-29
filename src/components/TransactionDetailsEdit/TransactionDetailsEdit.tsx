import { useEffect, useState } from 'react';
import { TRANSACTION_TYPES } from '../../constants/transactionTypes';
import { Transaction } from '../../types/Transaction';
import Picker from '../Picker/Picker';
import styles from './TransactionDetailsEdit.module.css';
import Button from '../Button/Button';
import { useExpenseCategories } from '../../hooks/useExpenseCategories';

interface TransactionDetailsEditProps {
    transaction: Transaction;
    setIsEditMode: (isEditMode: boolean) => void;
}

function TransactionDetailsEdit({
    transaction,
    setIsEditMode,
}: TransactionDetailsEditProps) {
    // const { categoriesWithSubcategories, categories } = useExpenseCategories();

    // const [selectedCategory, setSelectedCategory] = useState('');
    // const [selectedSubCategory, setSelectedSubCategory] = useState('');

    // const [editableDetails, setEditableDetails] = useState({
    //     type: transaction.type,
    //     categoryName: transaction.categoryName,
    //     amount: transaction.amount,
    //     accountName: transaction.accountName,
    //     date: transaction.date,
    //     description: transaction.description,
    // });

    // const onChange = (key: string, value: string | number) => {
    //     setEditableDetails({
    //         ...editableDetails,
    //         [key]: value,
    //     });
    // };

    // const handleSaveChanges = () => {};

    // const handleDiscardChanges = () => {
    //     setEditableDetails({
    //         type: transaction.type,
    //         categoryName: transaction.categoryName,
    //         amount: transaction.amount,
    //         accountName: transaction.accountName,
    //         date: transaction.date,
    //         description: transaction.description,
    //     });
    //     setIsEditMode(false);
    // };

    // const handleCategoryChange = (value: string) => {
    //     setSelectedCategory(value);
    //     const selectedCategory = categoriesWithSubcategories.find(
    //         (category) => category.name === value,
    //     );
    //     setSelectedSubCategory(selectedCategory?.subCategories[0].name || '');
    // };

    // const handleChangeSubCategory = (value: string) => {
    //     onChange('categoryName', value);
    // };

    // useEffect(() => {
    //     console.error(subCategories);
    //     const selectedCategory = categoriesWithSubcategories.find((category) =>
    //         category.subCategories.some(
    //             (subCategory) =>
    //                 subCategory.name === editableDetails.categoryName,
    //         ),
    //     );

    //     const subCategory = selectedCategory?.subCategories.find(
    //         (subCategory) => subCategory.name === editableDetails.categoryName,
    //     );

    //     setSelectedCategory(selectedCategory?.name || '');
    //     setSelectedSubCategory(subCategory?.name || '');
    // }, [subCategories]);

    return (
        <div className={styles.editContainer}>
            {/* <Picker
                label="Transaction Type"
                data={TRANSACTION_TYPES}
                value={transaction.type}
                onChange={(value) => onChange('type', value)}
            />
            <Picker
                label="Select category"
                data={categories}
                value={selectedCategory}
                onChange={handleCategoryChange}
            />
            <Picker
                label="Select subcategory"
                data={subCategories}
                value={selectedSubCategory}
                onChange={handleChangeSubCategory}
            />
            <Button label="Save" onClick={handleSaveChanges} />
            <Button label="Discard" onClick={handleDiscardChanges} /> */}
        </div>
    );
}

export default TransactionDetailsEdit;
