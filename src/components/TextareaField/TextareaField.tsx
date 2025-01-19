import styles from './TextareaField.module.css';

interface TextareaFieldProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    rows?: number;
    cols?: number;
}

function TextareaField({
    label = '',
    value,
    onChange,
    disabled,
    rows = 2,
    cols = 2,
}: TextareaFieldProps) {
    return (
        <div className={styles.textareaContainer}>
            {label ? <label className={styles.label}>{label}</label> : null}
            <textarea
                className={styles.textarea}
                rows={rows}
                cols={cols}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            ></textarea>
        </div>
    );
}

export default TextareaField;
