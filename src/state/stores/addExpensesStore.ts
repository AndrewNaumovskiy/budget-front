import { create } from "zustand";
import { Option } from "../../types";
import { CategoryWithSubCategories } from "../../types/CategoryWithSubCategories";

export type AddExpensesStore = {
    categories: Option[];
    subCategories: Option[];
    categoriesWithSubcategories: CategoryWithSubCategories[];

    setCategoriesWithSubCategories: (data: CategoryWithSubCategories[]) => void;
    setCategories: (categories: Option[]) => void;
    setSubCategories: (subCategories: Option[]) => void;
}

const useAddExpensesStore = create<AddExpensesStore>((set) => ({
    categories: [],
    subCategories: [],
    categoriesWithSubcategories: [],

    setCategoriesWithSubCategories: (data: CategoryWithSubCategories[]) => set({ categoriesWithSubcategories: data }),
    setCategories: (categories: Option[]) => set({ categories }),
    setSubCategories: (subCategories) => set({ subCategories }),
}));

export default useAddExpensesStore;