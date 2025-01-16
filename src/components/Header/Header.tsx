import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { ROUTES } from '../../constants/routes';
import { useLocation } from 'react-router';

function Header() {
    const location = useLocation();
    const [routeName, setRouteName] = useState<string>('');

    useEffect(() => {
        const currentPath = location.pathname;

        const foundedRouteName = Object.keys(ROUTES).find(
            (key) => ROUTES[key].route === currentPath,
        )!;

        setRouteName(ROUTES[foundedRouteName].name || 'Unknown page');
    }, [location.pathname]);

    return <header className={styles.header}>{routeName}</header>;
}

export default Header;
