import { create } from "zustand";
import { Option } from "../../types";
import { CategoryWithSubCategories } from "../../types/CategoryWithSubCategories";

export type AddExpensesStore = {
    accounts: Option[];
    categories: Option[];
    subCategories: Option[];
    categoriesWithSubcategories: CategoryWithSubCategories[];

    setAccounts: (accounts: Option[]) => void;
    setCategoriesWithSubCategories: (data: CategoryWithSubCategories[]) => void;
    setCategories: (categories: Option[]) => void;
    setSubCategories: (subCategories: Option[]) => void;
}

const useAddExpensesStore = create<AddExpensesStore>((set) => ({
    accounts: [],
    categories: [],
    subCategories: [],
    categoriesWithSubcategories: [],

    setAccounts: (accounts: Option[]) => set({ accounts }),
    setCategoriesWithSubCategories: (data: CategoryWithSubCategories[]) => set({ categoriesWithSubcategories: data }),
    setCategories: (categories: Option[]) => set({ categories }),
    setSubCategories: (subCategories) => set({ subCategories }),
}));

export default useAddExpensesStore;