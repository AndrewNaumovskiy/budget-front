import { useState } from 'react';
import { useParams } from 'react-router';
import styles from './TransactionDetails.module.css';
import { Transaction } from '../../types/Transaction';
import TransactionDetailsEdit from '../TransactionDetailsEdit/TransactionDetailsEdit';
import Button from '../Button/Button';
import { CorrespondingTransactionType } from '../../constants/correspondingTransactionType';
import { TransactionDetailsNames } from '../../constants/transactionDetailsNames';
import { useTransactionById } from '../../hooks/useTransactionById';
import Loader from '../Loader/Loader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';

function TransactionDetails() {
    const { id } = useParams();
    const { transaction, isLoading, error } = useTransactionById(id as string);

    const [isEditMode, setIsEditMode] = useState(false);

    const handleSetEditMode = () => {
        setIsEditMode(true);
    };

    const handleDeleteTransaction = () => {
        // delete transaction by id
    };
    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <SomethingWentWrong title="Failed to get transaction details" />;
    }

    if (isEditMode) {
        return (
            <TransactionDetailsEdit
                transaction={transaction}
                setIsEditMode={setIsEditMode}
            />
        );
    }

    return (
        <div className={styles.detailsContainer}>
            {Object.keys(transaction).map((key) => {
                if (
                    transaction[key as keyof Transaction] === null ||
                    transaction[key as keyof Transaction] === undefined ||
                    transaction[key as keyof Transaction] === ''
                ) {
                    return null;
                }

                return (
                    <div key={key} className={styles.detailsRow}>
                        <div className={styles.detailsName}>
                            {TransactionDetailsNames[key as keyof Transaction]}
                        </div>
                        <div className={styles.detailsValue}>
                            {key === 'type'
                                ? CorrespondingTransactionType[transaction[key]]
                                : transaction[key as keyof Transaction]}
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
