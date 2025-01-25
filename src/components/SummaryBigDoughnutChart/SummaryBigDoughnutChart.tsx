import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './SummaryBigDoughnutChart.module.css';
import { useMemo } from 'react';
import { useDetailedSummaryForMonth } from '../../hooks/useDetailedSummaryForMonth';

ChartJS.register(ArcElement, Tooltip, Legend);

function SummaryBigDoughnutChart() {
    const initialMonth = useMemo(() => new Date().getMonth() + 1, []);
    const initialYear = useMemo(() => new Date().getFullYear(), []);

    const { income, expense, savings, unspecified } =
        useDetailedSummaryForMonth(initialMonth, initialYear);

    const data = {
        labels: ['Expenses', 'Savings', 'Unspecified'],
        datasets: [
            {
                label: '',
                data: [expense, savings, unspecified],
                backgroundColor: ['#e30000', '#7d7e77', '#bea100'],
                borderWidth: 0,
                cutout: '90%',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };
    return (
        <div className={styles.bigDoughnutChart}>
            <div className={styles.chartTitle}>
                <p>Income in UAH</p>
                <h1>{income}</h1>
            </div>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default SummaryBigDoughnutChart;
