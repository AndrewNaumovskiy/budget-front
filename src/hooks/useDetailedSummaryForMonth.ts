import useSWR from "swr"
import { API_URLs } from "../constants/API_URLs"
import { getFetcher } from "../api/fetchers"
import { useEffect, useMemo, useState } from "react";

export const useDetailedSummaryForMonth = (initialMonth: number, initialYear: number) => {
    const url = useMemo(() => {
        return `${API_URLs.GET_SHORT_SUMMARY}?month=${initialMonth}&year=${initialYear}`;
    }, [initialMonth, initialYear]);

    const { data, } = useSWR(url, getFetcher);

    const [income, setIncome] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [savings, setSavings] = useState<number>(0);
    const [unspecified, setUnspecified] = useState<number>(0);

    const handleDateChange = (month: string, year: string) => {
        const newUrl = `${API_URLs.GET_EXPENSES_FOR_MONTH}?month=${month}&year=${year}`;
        if (url !== newUrl) {
            getFetcher(newUrl);
        }
    }

    useEffect(() => {
        if (data) {
            setIncome(Math.round(data.data.income * 1) / 1);
            setExpense(data.data.expenses);
            setSavings(data.data.savings);
            setUnspecified(data.data.unspecified);
        }
    }, [data]);

    return {
        income, expense, savings, unspecified, handleDateChange
    }
}