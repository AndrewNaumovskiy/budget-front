import { useEffect, useMemo, useState } from 'react';
import SummaryBigDoughnutChart from '../../components/SummaryBigDoughnutChart/SummaryBigDoughnutChart';
import styles from './DetailedSummaryPage.module.css';
import { ExpensesByCategories } from '../../types';
import SmallCategoryDoughnutChart from '../../components/SmallCategoryDoughnutChart/SmallCategoryDoughnutChart';

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
};

function DetailedSummaryPage() {
    const [expensesByCategories, setExpensesByCategories] =
        useState<ExpensesByCategories>({});

    const expensesSumOverall = 2000;

    const expensesSumByCategory: ExpensesByCategories = useMemo(
        () => ({
            Food: 500,
            Transportation: 200,
            Shopping: 300,
            Bills: 500,
            Others: 500,
        }),
        [],
    );

    useEffect(() => {
        // Fetch expenses by categories

        //Calculate percentage of expenses by category

        const percentages: ExpensesByCategories = {};
        Object.keys(expensesSumByCategory).forEach((category) => {
            const sum = expensesSumByCategory[category];

            const percentage = (sum / expensesSumOverall) * 100;

            percentages[category] = percentage;
        });

        setExpensesByCategories(percentages);
    }, [expensesSumOverall, expensesSumByCategory]);

    return (
        <div>
            <SummaryBigDoughnutChart />
            <div className={styles.categoriesSummaryCharts}>
                {Object.keys(expensesByCategories).map((category, index) => {
                    return (
                        <SmallCategoryDoughnutChart
                            category={category}
                            percentage={expensesByCategories[category]}
                            sum={expensesSumByCategory[category]}
                            key={category}
                            overallSum={expensesSumOverall}
                            color={CATEGORIES_CHART_COLORS[index]}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default DetailedSummaryPage;
