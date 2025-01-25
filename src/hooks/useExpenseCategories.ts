import useSWR from "swr";
import { API_URLs } from "../constants/API_URLs";
import useAddExpensesStore from "../state/stores/addExpensesStore";
import { getFetcher } from "../api/fetchers";
import { useEffect } from "react";
import { Option } from "../types";
import { CategoryWithSubCategories } from "../types/CategoryWithSubCategories";

export const useExpenseCategories = () => {
    const { data, error, isLoading } = useSWR(API_URLs.GET_CATEGORIES_AND_SUB_CATEGORIES, getFetcher);
    const { setCategoriesWithSubCategories, setCategories, categories } = useAddExpensesStore();

    useEffect(() => {
        if (data) {
            setCategoriesWithSubCategories(data.data.categories);

            const fetchedCategories: Option[] = data.data.categories.map(
                (category: CategoryWithSubCategories) => ({
                    label: category.name,
                    value: category.id,
                }),
            );
            setCategories(fetchedCategories);
        }
    }, [data, setCategoriesWithSubCategories, setCategories]);

    return { categories, isLoading, error };
}