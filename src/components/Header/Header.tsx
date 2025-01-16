import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { ROUTES } from '../../constants/routes';
import { useLocation, useNavigate } from 'react-router';
import { CiSettings } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isArrowShown, setIsArrowShown] = useState<boolean>(false);

    const [routeName, setRouteName] = useState<string>('');

    const handleNavigateToSettings = () => {
        navigate(ROUTES.SETTINGS.route);
    };

    const handleNavigateToDashboard = () => {
        navigate(ROUTES.DASHBOARD.route);
    };

    useEffect(() => {
        const currentPath = location.pathname;

        const foundedRouteName = Object.keys(ROUTES).find(
            (key) =>
                currentPath.split('/')[1] === ROUTES[key].route.split('/')[1],
        )!;

        setRouteName(ROUTES[foundedRouteName].name || 'Unknown page');
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === ROUTES.DASHBOARD.route) {
            setIsArrowShown(false);
        } else {
            setIsArrowShown(true);
        }
    }, [location.pathname]);

    return (
        <header className={styles.header}>
            {isArrowShown && (
                <IoIosArrowBack size={24} onClick={handleNavigateToDashboard} />
            )}
            <p>{routeName}</p>
            <CiSettings
                size={32}
                className={styles.settingsIcon}
                onClick={handleNavigateToSettings}
            />
        </header>
    );
}

export default Header;
