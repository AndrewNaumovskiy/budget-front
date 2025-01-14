import { useState } from 'react'
import { RiMenu2Fill } from 'react-icons/ri'
import styles from './MenuBurger.module.css'

function MenuBurger() {
    const [isOpened, setIsOpened] = useState(false)

    const handleMenuOpen = () => {
        setIsOpened(true)
    }

    const handleCloseMenu = () => {
        setIsOpened(false)
    }

    return (
        <div>
            {isOpened ? (
                <div className={styles.menu}>
                    <button onClick={handleCloseMenu}>Close</button>
                    <ul>
                        <li>Home</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>
            ) : (
                <RiMenu2Fill
                    className={styles.burgerMenuIcon}
                    onClick={handleMenuOpen}
                />
            )}
        </div>
    )
}

export default MenuBurger
