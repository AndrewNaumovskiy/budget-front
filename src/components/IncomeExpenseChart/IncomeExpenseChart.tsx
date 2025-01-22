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
import React, { useEffect } from 'react';
import useSWR from 'swr';
import { API_URLs } from '../../constants/API_URLs';
import { getFetcher } from '../../api/fetchers';
import Loader from '../Loader/Loader';
import SomethingWentWrong from '../SomethingWentWrong/SomethingWentWrong';
import { enqueueSnackbar } from 'notistack';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function IncomeExpenseChart() {
    const [incomeData, setIncomeData] = React.useState<number[]>([]);
    const [expenseData, setExpenseData] = React.useState<number[]>([]);

    const { data, isLoading, error } = useSWR(
        API_URLs.GET_LAST_SIX_MONTHS_DATA,
        getFetcher,
        {
            shouldRetryOnError: false,
        },
    );

    const labels = getLastSixMonths();

    const handleFetch = () => {
        getFetcher(API_URLs.GET_LAST_SIX_MONTHS_DATA);
    };

    useEffect(() => {
        if (data) {
            setIncomeData(data.data.income);
            setExpenseData(data.data.expense);
        }
    }, [data]);

    if (isLoading) return <Loader />;

    if (error) {
        enqueueSnackbar('Failed to load income and expense for last 6 months', {
            variant: 'error',
        });

        return <SomethingWentWrong tryAgain={handleFetch} />;
    }

    return (
        <React.Fragment>
            <Bar
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: 'Income',
                            data: incomeData,
                            backgroundColor: '#00312f',
                            stack: 'Stack 0',
                        },
                        {
                            label: 'Expense',
                            data: expenseData,
                            backgroundColor: '#bea100',
                            stack: 'Stack 1',
                        },
                    ],
                }}
                style={{ width: '100%', height: '100%' }}
            />
        </React.Fragment>
    );
}

export default IncomeExpenseChart;
