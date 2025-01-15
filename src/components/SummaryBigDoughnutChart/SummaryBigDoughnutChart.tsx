import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './SummaryBigDoughnutChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function SummaryBigDoughnutChart() {
    const data = {
        labels: ['Income', 'Expenses', 'Left for Saving'],
        datasets: [
            {
                label: '',
                data: [5000, 2000, 3000],
                backgroundColor: ['#007a57', '#bea100', '#7d7e77'],
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
