import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import styles from './AccountPage.module.css';
import { ROUTES } from '../../constants/routes';
import AccountSettings from '../../components/AccountSettings/AccountSettings';
import Loader from '../../components/Loader/Loader';

function AccountPage() {
    const navigate = useNavigate();

    const { isAuthorized, isLoading } = useIsAuthorized();

    const navigateToLoginPage = () => {
        navigate(ROUTES.LOGIN.route);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (!isAuthorized) {
        return (
            <div>
                <Button label="Log in" onClick={navigateToLoginPage} />
            </div>
        );
    }
    return (
        <div className={styles.accountPageContainer}>
            <AccountSettings />
        </div>
    );
}

export default AccountPage;
