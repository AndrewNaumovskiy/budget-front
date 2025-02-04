import useSWR from "swr"
import { API_URLs } from "../constants/API_URLs"
import { getFetcher } from "../api/fetchers"
import useAddIncomeStore from "../state/stores/addIncomeStore";
import { useEffect } from "react";


export const useIncomeTypes = () => {
    const { data, error, isLoading } = useSWR(API_URLs.GET_INCOME_CATEGORIES, getFetcher);
    const { incomeTypes, setIncomeTypes } = useAddIncomeStore();

    useEffect(() => {
        if (data) {
            const updatedIncomeTypes = data.data.categories[0].subCategories.map((item: { id: number, name: string }) => ({
                label: item.name,
                value: item.id
            }));

            setIncomeTypes(updatedIncomeTypes);
        }
    }, [data, setIncomeTypes]);

    return {
        incomeTypes, isLoading, error
    }
}