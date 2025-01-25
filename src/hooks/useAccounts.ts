import useAddExpensesStore from "../state/stores/addExpensesStore";

export const useAccounts = () => useAddExpensesStore((state) => state.accounts);