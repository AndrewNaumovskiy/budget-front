import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './SummaryBigDoughnutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function SummaryBigDoughnutChart() {
    const data = {
        labels: ['Expenses', 'Savings', 'Unspecified'],
        datasets: [
            {
                label: '',
                data: [2000, 3000, 1000],
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
                <p>Remaining</p>
                <h1>$3,000</h1>
            </div>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default SummaryBigDoughnutChart;
