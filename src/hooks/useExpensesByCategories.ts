import useSWR from "swr";
import useExpensesByCategoriesStore from "../state/stores/detailedSummaryStore"
import { API_URLs } from "../constants/API_URLs";
import { getFetcher } from "../api/fetchers";
import { useEffect, useMemo, useState } from "react";
import { ExpenseResponse } from "../types/ExpenseResponse";
import { ExpensesByCategories } from "../types";

const processExpensesData = (expenses: ExpenseResponse[]): ExpensesByCategories => {
    // Group expenses by category
    const groupedData = expenses.reduce((acc: ExpensesByCategories, expense) => {
        const { categoryName, amount } = expense;

        if (!acc[categoryName]) {
            acc[categoryName] = { amount: 0, percentage: 0 };
        }

        acc[categoryName].amount += amount;

        return acc;
    }, {});

    // Calculate percentages
    const totalAmount = Object.values(groupedData).reduce((acc, curr) => acc + curr.amount, 0);

    const processedData = Object.entries(groupedData).reduce((acc, [category, data]) => {
        acc[category] = {
            amount: Math.round(data.amount * 100) / 100,
            percentage: Math.round((data.amount / totalAmount) * 1000) / 10
        };
        return acc;
    }, {} as ExpensesByCategories);

    // Sort by amount
    return Object.fromEntries(
        Object.entries(processedData).sort((a, b) => b[1].amount - a[1].amount)
    );
}

export const useExpensesByCategories = (initialMonth: string) => {
    const { expensesByCategories, setExpensesByCategories } = useExpensesByCategoriesStore();
    const [overallSum, setOverallSum] = useState<number>(0);
    const [currentMonth, setCurrentMonth] = useState<string>(initialMonth);

    const url = useMemo(() =>
        `${API_URLs.GET_EXPENSES_FOR_MONTH}?from=${currentMonth}&to=${currentMonth}`,
        [currentMonth]
    );

    const { data, isLoading, error } = useSWR(url, getFetcher);

    const handleChangeMonth = (month: string) => {
        setCurrentMonth(month);
    }

    useEffect(() => {
        if (data?.data?.expenses) {
            const processedData = processExpensesData(data.data.expenses);

            const wholeSum = Object.values(processedData).reduce((acc, curr) => acc + curr.amount, 0);

            setOverallSum(wholeSum);
            setExpensesByCategories(processedData);
        }
    }, [data, setExpensesByCategories]);

    return {
        expensesByCategories,
        overallSum,
        isLoading,
        error,
        handleChangeMonth
    };
}