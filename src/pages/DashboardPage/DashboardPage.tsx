import IncomeExpenseChart from '../../components/IncomeExpenseChart/IncomeExpenseChart';
import styles from './DashboardPage.module.css';

function DashboardPage() {
    return (
        <div className={styles.dashboard}>
            <IncomeExpenseChart />
        </div>
    );
}

export default DashboardPage;
