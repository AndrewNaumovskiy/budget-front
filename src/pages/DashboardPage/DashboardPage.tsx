import { Navigate } from 'react-router';
import CurrentMonthShortSummary from '../../components/CurrentMonthShortSummary/CurrentMonthShortSummary';
import IncomeExpenseChart from '../../components/IncomeExpenseChart/IncomeExpenseChart';
import RecentTransactionsList from '../../components/RecentTransactionsList/RecentTransactionsList';
import styles from './DashboardPage.module.css';
import { ROUTES } from '../../constants/routes';
import { useIsAuthorized } from '../../hooks/useIsAuthorized';
import Loader from '../../components/Loader/Loader';

function DashboardPage() {
    const isAuthorized = useIsAuthorized();

    if (isAuthorized === null) return <Loader />;
    if (!isAuthorized) return <Navigate to={ROUTES.LOGIN.route} />;

    return (
        <div className={styles.dashboard}>
            <IncomeExpenseChart />
            <CurrentMonthShortSummary />
            <RecentTransactionsList />
        </div>
    );
}

export default DashboardPage;
