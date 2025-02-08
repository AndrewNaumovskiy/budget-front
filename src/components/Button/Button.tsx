import styles from './Button.module.css';

type ButtonVariant = 'success' | 'error' | 'none';

interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: ButtonVariant;
}

function Button({
    label,
    onClick,
    disabled = false,
    variant = 'success',
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${styles[variant]} ${
                disabled ? styles.disabled : ''
            }`}
        >
            {label}
        </button>
    );
}

export default Button;
