import useSWR from "swr"
import { API_URLs } from "../constants/API_URLs";
import { useEffect, useState } from "react";
import { getFetcher } from "../api/fetchers";
import { Filters } from "../types/Filters";
import { Transaction } from "../types/Transaction";

export const useStatisticsData = () => {
    const [statisticsData, setStatisticsData] = useState<Transaction[]>([]);

    const [filters, setFilters] = useState<Filters>({
        transactionType: 'income',
        from: new Date().toISOString().slice(0, 10),
        to: new Date().toISOString().slice(0, 10),
    });
    const [url, setUrl] = useState(`${API_URLs.GET_STATISTICS}/${filters.transactionType}?from=${filters.from}&to=${filters.to}`);


    const { data, isLoading, error } = useSWR(url, getFetcher);


    const onFilterChanged = (key: keyof Filters, value: Filters[keyof Filters]) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    }

    const applyFilters = () => {
        setUrl(`${API_URLs.GET_STATISTICS}/${filters.transactionType}?from=${filters.from}&to=${filters.to}`);
    }

    useEffect(() => {
        if (data) {
            // TODO: use such ref data.data[filters.transactionType] instead of array
            const array = filters.transactionType === 'income' ? data.data.income : data.data.expenses;
            const updatedData = array.map((transaction: Transaction) => ({
                ...transaction,
                date: transaction.date.slice(0, 10),
            }));

            setStatisticsData(updatedData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return { statisticsData, isLoading, error, filters, onFilterChanged, applyFilters };
}