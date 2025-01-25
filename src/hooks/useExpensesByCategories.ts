import useSWR from "swr";
import useExpensesByCategoriesStore from "../state/stores/detailedSummaryStore"
import { API_URLs } from "../constants/API_URLs";
import { getFetcher } from "../api/fetchers";
import { useEffect, useMemo, useState } from "react";
import { ExpenseResponse } from "../types/ExpenseResponse";
import { ExpensesByCategories } from "../types";


export const useExpensesByCategories = (initialMonth: string) => {
    const { expensesByCategories, setExpensesByCategories } = useExpensesByCategoriesStore();
    const [overallSum, setOverallSum] = useState<number>(0);

    const url = useMemo(() => {
        return `${API_URLs.GET_EXPENSES_FOR_MONTH}?from=${initialMonth}&to=${initialMonth}`;
    }, [initialMonth]);

    const { data, isLoading, error, mutate } = useSWR(url, getFetcher);

    const handleChangeMonth = async (month: string) => {
        const newUrl = `${API_URLs.GET_EXPENSES_FOR_MONTH}?from=${month}-01&to=${month}-31`;
        if (url !== newUrl) {
            await mutate([newUrl, getFetcher(newUrl)]);
        }
    }

    const groupByCategories = (expenses: ExpenseResponse[]) => {
        const resultObj: ExpensesByCategories = {};

        expenses.forEach((expense) => {
            if (resultObj[expense.categoryName]) {
                resultObj[expense.categoryName].amount += expense.amount;
            } else {
                resultObj[expense.categoryName] = { amount: 0, percentage: 0 };
                resultObj[expense.categoryName].amount = expense.amount;
            }
        });

        return resultObj;
    }

    const addPercentages = (groupedData: ExpensesByCategories) => {
        const totalAmount = Object.values(groupedData).reduce((acc, curr) => acc + curr.amount, 0);

        for (const key in groupedData) {
            groupedData[key].percentage = (groupedData[key].amount / totalAmount) * 100;
        }

        return groupedData;
    }

    const roundData = (groupedData: ExpensesByCategories) => {
        for (const key in groupedData) {
            groupedData[key].amount = Math.round(groupedData[key].amount * 100) / 100;
            groupedData[key].percentage = Math.round(groupedData[key].percentage * 10) / 10;
        }

        return groupedData;
    }

    const sortByAmount = (groupedData: ExpensesByCategories) => {
        return Object.fromEntries(
            Object.entries(groupedData).sort((a, b) => b[1].amount - a[1].amount)
        );
    }

    useEffect(() => {
        if (data) {
            const groupedData = groupByCategories(data.data.expenses);
            const dataWithPercentages = addPercentages(groupedData);
            const roundedData = roundData(dataWithPercentages);
            const sortedData = sortByAmount(roundedData);

            const wholeSum = Object.values(sortedData).reduce((acc, curr) => acc + curr.amount, 0);
            setOverallSum(wholeSum);

            setExpensesByCategories(sortedData);
        }
    }, [data, setExpensesByCategories]);

    return { expensesByCategories, overallSum, isLoading, error, handleChangeMonth };
}