import { ChangeEvent } from 'react';
import { CURRENCIES } from '../../constants/currencies';
import styles from './CurrencyPicker.module.css';

interface CurrencyPickerProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function CurrencyPicker({ value, onChange }: CurrencyPickerProps) {
    return (
        <select
            className={styles.currencyPicker}
            value={value}
            onChange={onChange}
        >
            {Object.keys(CURRENCIES).map((currency) => (
                <option key={currency} value={currency}>
                    {currency}
                </option>
            ))}
        </select>
    );
}

export default CurrencyPicker;
