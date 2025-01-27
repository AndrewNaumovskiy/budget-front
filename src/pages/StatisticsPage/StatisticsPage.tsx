import Loader from '../../components/Loader/Loader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import StatisticsFilters from '../../components/StatisticsFilters/StatisticsFilters';
import StatisticsList from '../../components/StatisticsList/StatisticsList';
import { useStatisticsData } from '../../hooks/useStatisticsData';
import styles from './StatisticsPage.module.css';

function StatisticsPage() {
    const { statisticsData, error, isLoading } = useStatisticsData();

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <SomethingWentWrong title="Failed to get statistics" />;
    }

    return (
        <div className={styles.statisticsPage}>
            <StatisticsFilters />
            <StatisticsList data={statisticsData} />
        </div>
    );
}

export default StatisticsPage;
