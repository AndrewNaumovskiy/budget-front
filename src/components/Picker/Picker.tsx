import { Option } from '../../types';
import styles from './Picker.module.css';

interface PickerProps {
    data: Option[];
    onChange: (value: string) => void;
    label?: string;
    value: string | null;
}

function Picker({ data, onChange, label, value }: PickerProps) {
    return (
        <div className={styles.pickerContainer}>
            {label ? <label className={styles.label}>{label}</label> : null}
            <select
                value={value || ''}
                className={styles.picker}
                onChange={(e) => onChange(e.target.value)}
            >
                {data.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Picker;
