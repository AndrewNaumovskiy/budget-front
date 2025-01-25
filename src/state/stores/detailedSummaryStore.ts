import { create } from "zustand";
import { ExpensesByCategories } from "../../types";


export type ExpensesByCategoriesStore = {
    expensesByCategories: ExpensesByCategories;

    setExpensesByCategories: (expensesByCategories: ExpensesByCategories) => void;
}

const useExpensesByCategoriesStore = create<ExpensesByCategoriesStore>((set) => ({
    expensesByCategories: {},
    setExpensesByCategories: (expensesByCategories) => set({
        expensesByCategories
    })
}));

export default useExpensesByCategoriesStore;