import styles from './DateRangePicker.module.css';
import DatePicker from '../DatePicker/DatePicker';

interface DateRangePickerComponent {
    from: string;
    to: string;
    onFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DateRangePickerComponent({
    from,
    to,
    onFromChange,
    onToChange,
}: DateRangePickerComponent) {
    return (
        <div className={styles.dateRangePickers}>
            <DatePicker
                label={'From'}
                value={from}
                onChange={onFromChange}
                max={to}
            />
            <DatePicker
                label={'To'}
                value={to}
                onChange={onToChange}
                min={from}
                max={new Date().toISOString().slice(0, 10)}
            />
        </div>
    );
}

export default DateRangePickerComponent;
