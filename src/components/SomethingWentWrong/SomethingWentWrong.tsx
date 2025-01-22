import Button from '../Button/Button';
import styles from './SomethingWentWrong.module.css';

interface SomethingWentWrongProps {
    title?: string;
    tryAgain?: () => void;
}

function SomethingWentWrong({ title, tryAgain }: SomethingWentWrongProps) {
    return (
        <div className={styles.errorContainer}>
            <h3>{title ? title : 'Something went wrong'}</h3>
            <Button
                onClick={tryAgain ? tryAgain : () => {}}
                label="Try again"
            />
        </div>
    );
}

export default SomethingWentWrong;
