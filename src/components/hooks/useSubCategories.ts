import useAddExpensesStore from "../../state/stores/addExpensesStore";

export const useSubCategories = () => useAddExpensesStore((state) => state.subCategories);