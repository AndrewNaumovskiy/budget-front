import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.css';

function LoginPage() {
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.title}>Welcome</h1>
            <h3 className={styles.subtitle}>Login to access your account</h3>
            <LoginForm />
        </div>
    );
}

export default LoginPage;
