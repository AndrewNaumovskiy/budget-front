import { useEffect, useMemo, useState } from 'react';
import SummaryBigDoughnutChart from '../../components/SummaryBigDoughnutChart/SummaryBigDoughnutChart';
import styles from './DetailedSummaryPage.module.css';
import SmallCategoryDoughnutChart from '../../components/SmallCategoryDoughnutChart/SmallCategoryDoughnutChart';
import MonthPicker from '../../components/MonthPicker/MonthPicker';
import { useExpensesByCategories } from '../../hooks/useExpensesByCategories';

const CATEGORIES_CHART_COLORS: { [key: string]: string } = {
    0: '#e33a9c',
    1: '#56a8d4',
    2: '#fca404',
    3: '#007a57',
    4: '#bea100',
    5: '#7d7e77',
    6: '#9faeb3',
    7: '#ff4b6a',
    8: '#43c3c9',
    9: '#b416ff',
    10: '#8dd7bf',
    11: '#ff96c5',
    12: '#ff9f80',
    13: '#6c88c4',
    14: '#0065a2',
    15: '#cff800',
    16: '#ff6c00',
    17: '#ff00ff',
    18: '#00ff00',
    19: '#0000ff',
    20: '#ff0000',
    21: '#00ffff',
    22: '#ffff00',
};

function DetailedSummaryPage() {
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [min, setMin] = useState<string>('');

    const currentMonth = useMemo(() => new Date().toISOString(), []);

    const { expensesByCategories, overallSum, handleChangeMonth } =
        useExpensesByCategories(currentMonth);

    const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(event.target.value);
        handleChangeMonth(event.target.value);
    };

    useEffect(() => {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${
            now.getMonth() + 1 < 10 ? '0' : ''
        }${now.getMonth() + 1}`;

        const minMonth = `${now.getFullYear() - 1}-${
            now.getMonth() + 1 < 10 ? '0' : ''
        }${now.getMonth() + 1}`;

        setMin(minMonth);
        setSelectedMonth(currentMonth);
    }, []);

    return (
        <div className={styles.detailedSummaryPage}>
            <MonthPicker
                min={min}
                value={selectedMonth}
                onChange={handleMonthChange}
            />
            <SummaryBigDoughnutChart />
            <div className={styles.categoriesSummaryCharts}>
                {Object.keys(expensesByCategories).map((category, index) => {
                    return (
                        <SmallCategoryDoughnutChart
                            category={category}
                            percentage={
                                expensesByCategories[category].percentage
                            }
                            sum={expensesByCategories[category].amount}
                            key={category}
                            overallSum={overallSum}
                            color={CATEGORIES_CHART_COLORS[index]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default DetailedSummaryPage;
