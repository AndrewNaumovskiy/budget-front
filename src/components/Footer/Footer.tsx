import styles from './Footer.module.css';
import { IoHomeOutline } from 'react-icons/io5';
import { AiOutlinePieChart } from 'react-icons/ai';
import { MdOutlineSavings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';

function Footer() {
    const navigate = useNavigate();

    const MENU_ITEMS = {
        firstGroup: [
            {
                icon: IoHomeOutline,
                text: 'Home',
                route: ROUTES.DASHBOARD,
            },
            {
                icon: AiOutlinePieChart,
                text: 'Statistics',
                route: ROUTES.STATISTICS,
            },
        ],
        secondGroup: [
            {
                icon: MdOutlineSavings,
                text: 'Savings',
                route: ROUTES.SAVINGS,
            },
            {
                icon: RxAvatar,
                text: 'Account',
                route: ROUTES.ACCOUNT,
            },
        ],
    };

    const handleNavigate = (selectedRoute: string) => {
        navigate(selectedRoute);
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.menuGroup}>
                {MENU_ITEMS.firstGroup.map((item, index) => (
                    <div
                        key={index}
                        className={styles.menuItem}
                        onClick={() => handleNavigate(item.route)}
                    >
                        <item.icon size={24} />
                        {item.text}
                    </div>
                ))}
            </div>
            <div className={styles.menuCenter}>
                <div className={styles.centerButtonContainer}>
                    <button className={styles.centerButton}>+</button>
                </div>
            </div>
            <div className={styles.menuGroup}>
                {MENU_ITEMS.secondGroup.map((item, index) => (
                    <div
                        key={index}
                        className={styles.menuItem}
                        onClick={() => handleNavigate(item.route)}
                    >
                        <item.icon size={24} />
                        {item.text}
                    </div>
                ))}
            </div>
        </footer>
    );
}

export default Footer;
