import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './TransactionDetails.module.css';
import { Transaction } from '../../types/Transaction';
import { Account } from '../../types/Account';
import TransactionDetailsEdit from '../TransactionDetailsEdit/TransactionDetailsEdit';
import Button from '../Button/Button';

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
        id: 760,
        type: 0,
        date: '2025-01-08T18:28:48',
        amount: 0,
        accountName: Account.UkrSib,
        categoryName: 'Зарплата',
        balance: 46475.31,
        description: 'Вареники, пельмені',
    };

    // const INCOME_TRANSACTION = {
    //         "id": 711,
    //         "type": ,
    //         "date": "2025-01-06T00:00:00",
    //         "amount": 425,
    //         "description": "Олег за Лігурію",
    //         "accountName": "Privat",
    //         "categoryName": "Перекази",
    //         "balance": 17397.59
    // }

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
                            {EXPENSE_TRANSACTION[key as keyof Transaction]}
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
