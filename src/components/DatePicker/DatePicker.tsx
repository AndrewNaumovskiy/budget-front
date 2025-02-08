import React from 'react';
import styles from './DatePicker.module.css';

interface DatePickerProps {
    label?: string;
    value: string;
    min?: string;
    max?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

function DatePicker({
    min,
    max,
    label,
    value,
    onChange,
    disabled = false,
}: DatePickerProps) {
    return (
        <div className={styles.datePickerContainer}>
            {label ? <label className={styles.label}>{label}</label> : null}
            <input
                min={min}
                max={max}
                className={styles.datePicker}
                type="date"
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}

export default DatePicker;
