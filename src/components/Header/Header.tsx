import styles from './Header.module.css';
import MenuBurger from '../MenuBurger/MenuBurger';

function Header() {
    return (
        <header className={styles.header}>
            <MenuBurger />
        </header>
    );
}

export default Header;
