import React from 'react';
import styles from './SumEntryField.module.css';

interface SumEntryFieldProps {
    sum: number;
    handleChangeSum: (value: number) => void;
    disabled?: boolean;
}
function SumEntryField({
    sum,
    handleChangeSum,
    disabled = false,
}: SumEntryFieldProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value) || 0;
        handleChangeSum(value);
    };

    return (
        <div className={styles.sumContainer}>
            <h4 className={styles.label}>How much?</h4>
            <div className={styles.sumInputContainer}>
                <input
                    disabled={disabled}
                    className={styles.sum}
                    type="number"
                    value={sum}
                    onChange={handleInputChange}
                />
                <h3>UAH</h3>
            </div>
        </div>
    );
}

export default SumEntryField;
