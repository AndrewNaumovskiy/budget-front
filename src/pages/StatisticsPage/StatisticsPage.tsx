import Loader from '../../components/Loader/Loader';
import SomethingWentWrong from '../../components/SomethingWentWrong/SomethingWentWrong';
import StatisticsFilters from '../../components/StatisticsFilters/StatisticsFilters';
import StatisticsList from '../../components/StatisticsList/StatisticsList';
import { useStatisticsData } from '../../hooks/useStatisticsData';
import styles from './StatisticsPage.module.css';

function StatisticsPage() {
    const {
        statisticsData,
        error,
        isLoading,
        applyFilters,
        filters,
        onFilterChanged,
    } = useStatisticsData();

    return (
        <div className={styles.statisticsPage}>
            <StatisticsFilters
                filters={filters}
                applyFilters={applyFilters}
                onFilterChanged={onFilterChanged}
            />
            {isLoading ? (
                <Loader />
            ) : error ? (
                <SomethingWentWrong title="Failed to get statistics" />
            ) : (
                <StatisticsList data={statisticsData} />
            )}{' '}
        </div>
    );
}

export default StatisticsPage;
