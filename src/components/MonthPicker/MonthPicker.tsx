import { ChangeEvent } from 'react';
import styles from './MonthPicker.module.css';

interface MonthPickerProps {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    min: string;
    max?: string;
}

function MonthPicker({ value, onChange, min, max }: MonthPickerProps) {
    return (
        <div className={styles.monthPickerContainer}>
            <input
                type="month"
                value={value}
                onChange={onChange}
                min={min}
                max={max || value}
            />
        </div>
    );
}

export default MonthPicker;
