import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { getLastSixMonths } from '../../utils/getLastSixMonths';
import React from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
function IncomeExpenseChart() {
    const labels = getLastSixMonths();
    return (
        <React.Fragment>
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Income',
                            data: [200, 200, 300, 100, 500, 600],
                            backgroundColor: '#00312f',
                            stack: 'Stack 0',
                        },
                        {
                            label: 'Expense',
                            data: [200, 50, 150, 200, 300, 100],
                            backgroundColor: '#007a57',
                            stack: 'Stack 0',
                        },
                    ],
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </React.Fragment>
    );
}

export default IncomeExpenseChart;
