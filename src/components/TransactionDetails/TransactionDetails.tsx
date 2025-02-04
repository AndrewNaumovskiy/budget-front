import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './TransactionDetails.module.css';
import { Transaction } from '../../types/Transaction';
import { Account } from '../../types/Account';
import TransactionDetailsEdit from '../TransactionDetailsEdit/TransactionDetailsEdit';
import Button from '../Button/Button';
import { CorrespondingTransactionType } from '../../constants/correspondingTransactionType';

function TransactionDetails() {
    const { id } = useParams();
    const [isEditMode, setIsEditMode] = useState(false);

    const TransactionDetailsNames: { [key: string]: string } = {
        id: 'ID',
        type: 'Type',
        date: 'Date',
        amount: 'Amount',
        description: 'Description',
        accountName: 'Account',
        categoryName: 'Category',
        balance: 'Balance',
    };
    const EXPENSE_TRANSACTION: Transaction = {
        id: 771,
        type: 1,
        date: '2025-01-31T14:44:40',
        amount: 30,
        description: '',
        accountName: Account.UkrSib,
        categoryName: 'Таксі',
        balance: 46737.53,
    };

    const handleSetEditMode = () => {
        setIsEditMode(true);
    };

    const handleDeleteTransaction = () => {
        // delete transaction by id
    };

    useEffect(() => {
        // fetch transaction details by id
    }, [id]);

    if (isEditMode) {
        return (
            <TransactionDetailsEdit
                transaction={EXPENSE_TRANSACTION}
                setIsEditMode={setIsEditMode}
            />
        );
    }

    return (
        <div className={styles.detailsContainer}>
            {Object.keys(EXPENSE_TRANSACTION).map((key) => {
                return (
                    <div key={key} className={styles.detailsRow}>
                        <div className={styles.detailsName}>
                            {TransactionDetailsNames[key as keyof Transaction]}
                        </div>
                        <div className={styles.detailsValue}>
                            {key === 'type'
                                ? CorrespondingTransactionType[
                                      EXPENSE_TRANSACTION[key]
                                  ]
                                : EXPENSE_TRANSACTION[key as keyof Transaction]}
                        </div>
                    </div>
                );
            })}
            <Button label="Edit" onClick={handleSetEditMode} />
            <Button label="Delete" onClick={handleDeleteTransaction} />
        </div>
    );
}

export default TransactionDetails;
