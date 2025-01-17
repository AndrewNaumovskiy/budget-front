import styles from './Footer.module.css';
import { IoHomeOutline } from 'react-icons/io5';
import { AiOutlinePieChart } from 'react-icons/ai';
import { MdOutlineSavings } from 'react-icons/md';
import { RxAvatar } from 'react-icons/rx';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../constants/routes';
import AddExpensesButton from './AddExpensesButton/AddExpensesButton';

function Footer() {
    const navigate = useNavigate();

    const MENU_ITEMS = {
        firstGroup: [
            {
                icon: IoHomeOutline,
                text: 'Home',
                route: ROUTES.DASHBOARD.route,
            },
            {
                icon: AiOutlinePieChart,
                text: 'Statistics',
                route: ROUTES.STATISTICS.route,
            },
        ],
        secondGroup: [
            {
                icon: MdOutlineSavings,
                text: 'Savings',
                route: ROUTES.SAVINGS.route,
            },
            {
                icon: RxAvatar,
                text: 'Account',
                route: ROUTES.ACCOUNT.route,
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
                <AddExpensesButton />
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
