import { Transaction } from '../../types/Transaction';
import styles from './TransactionDetailsEdit.module.css';
import { TransactionType } from '../../types/TransactionType';
import IncomeDetailsEdit from './IncomeDetailsEdit/IncomeDetailsEdit';

interface TransactionDetailsEditProps {
    transaction: Transaction;
    setIsEditMode: (isEditMode: boolean) => void;
}

function TransactionDetailsEdit({
    transaction,
    setIsEditMode,
}: TransactionDetailsEditProps) {
    // if (transaction.type === TransactionType.Expense) {
    //     return (
    //         <ExpenseDetailsEdit
    //             transaction={transaction}
    //             setIsEditMode={setIsEditMode}
    //         />
    //     );
    // }

    return (
        <div className={styles.editContainer}>
            {transaction.type === TransactionType.Income ? (
                <IncomeDetailsEdit
                    transaction={transaction}
                    setIsEditMode={setIsEditMode}
                />
            ) : null}
            {/* <DatePicker
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
                value={selectedAccountId as number}
                onChange={(value) => onDetailsChange('accountName', value)}
                disabled={isMutating}
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
            /> */}
        </div>
    );
}

export default TransactionDetailsEdit;
