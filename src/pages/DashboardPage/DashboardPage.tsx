import CurrentMonthShortSummary from '../../components/CurrentMonthShortSummary/CurrentMonthShortSummary';
import IncomeExpenseChart from '../../components/IncomeExpenseChart/IncomeExpenseChart';
import RecentTransactionsList from '../../components/RecentTransactionsList/RecentTransactionsList';
import styles from './DashboardPage.module.css';

function DashboardPage() {
    return (
        <div className={styles.dashboard}>
            <IncomeExpenseChart />
            <CurrentMonthShortSummary />
            <RecentTransactionsList />
        </div>
    );
}

export default DashboardPage;
