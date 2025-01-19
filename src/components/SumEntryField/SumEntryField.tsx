import { ChangeEvent, useState } from 'react';
import styles from './SumEntryField.module.css';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';

function SumEntryField() {
    //const [value, setValue] = useState(0);
    const [currency, setCurrency] = useState('UAH');

    const handleChangeCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    };

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
                >
                    0
                </div>
                <CurrencyPicker
                    value={currency}
                    onChange={handleChangeCurrency}
                />
            </div>
        </div>
    );
}

export default SumEntryField;
