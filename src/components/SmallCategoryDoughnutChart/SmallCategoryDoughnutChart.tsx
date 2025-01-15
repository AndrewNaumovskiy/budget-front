import styles from './SmallCategoryDoughnutChart.module.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SmallCategoryDoughnutChartProps {
    category: string;
    percentage: number;
    sum: number;
    overallSum: number;
    color: string;
}

function SmallCategoryDoughnutChart({
    category,
    overallSum,
    percentage,
    sum,
    color,
}: SmallCategoryDoughnutChartProps) {
    const data = {
        labels: [category],
        datasets: [
            {
                label: '',
                data: [sum, overallSum - sum],
                backgroundColor: [color, '#cacaca'],
                borderWidth: 0,
                cutout: '80%',
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
        <div className={styles.smallDoughnutChart}>
            <div className={styles.chartTitle}>
                <h2>{percentage}%</h2>
            </div>
            <Doughnut data={data} options={options} />
            <p>{category}</p>
        </div>
    );
}

export default SmallCategoryDoughnutChart;
