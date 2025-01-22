import React from 'react';
import styles from './SumEntryField.module.css';

interface SumEntryFieldProps {
    sum: number;
    handleChangeSum: (value: number) => void;
}
function SumEntryField({ sum, handleChangeSum }: SumEntryFieldProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (
            e.key === 'Enter' ||
            e.key === 'Tab' ||
            e.key === 'Space' ||
            e.key.match(/^[a-zA-Zа-яА-Я]$/) ||
            e.key === '-'
        ) {
            e.preventDefault();
        }

        handleChangeSum(Number(e.currentTarget.textContent || 0));
    };

    const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        handleChangeSum(Number(e.currentTarget.textContent?.trim() || 0));
    };

    return (
        <div className={styles.sumContainer}>
            <h4 className={styles.label}>How much?</h4>
            <div className={styles.sumInputContainer}>
                <div
                    className={styles.sum}
                    contentEditable
                    suppressContentEditableWarning={true}
                    onKeyDown={handleKeyDown}
                    onBlur={handleOnBlur}
                >
                    {sum}
                </div>
                <h3>UAH</h3>
            </div>
        </div>
    );
}

export default SumEntryField;
