import styles from './Input.module.css';

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    name?: string;
    label?: string;
    id?: string;
    placeholder?: string;
    disabled?: boolean;
}

function Input({
    onChange,
    value,
    disabled,
    label,
    type = 'text',
    name = '',
    id = '',
    placeholder = '',
}: InputProps) {
    return (
        <div className={styles.inputContainer}>
            {label ? (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            ) : null}
            <input
                className={styles.input}
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
}

export default Input;
