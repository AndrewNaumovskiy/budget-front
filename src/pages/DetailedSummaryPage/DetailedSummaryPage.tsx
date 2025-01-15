import SummaryBigDoughnutChart from '../../components/SummaryBigDoughnutChart/SummaryBigDoughnutChart';
import styles from './DetailedSummaryPage.module.css';

function DetailedSummaryPage() {
    return (
        <div>
            <SummaryBigDoughnutChart />
            <div className={styles.categoriesSummaryCharts}></div>
        </div>
    );
}

export default DetailedSummaryPage;
