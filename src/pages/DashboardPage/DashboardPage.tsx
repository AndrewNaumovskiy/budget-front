import CurrentMonthShortSummary from '../../components/CurrentMonthShortSummary/CurrentMonthShortSummary';
import IncomeExpenseChart from '../../components/IncomeExpenseChart/IncomeExpenseChart';
import styles from './DashboardPage.module.css';

function DashboardPage() {
    return (
        <div className={styles.dashboard}>
            <IncomeExpenseChart />
            <CurrentMonthShortSummary />
        </div>
    );
}

export default DashboardPage;
