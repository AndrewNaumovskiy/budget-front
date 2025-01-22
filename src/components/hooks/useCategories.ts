import useAddExpensesStore from "../../state/stores/addExpensesStore";

export const useCategories = () => useAddExpensesStore((state) => state.categories);