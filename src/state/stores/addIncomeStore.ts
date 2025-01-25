import { create } from "zustand";
import { Option } from "../../types";


export type AddIncomeStore = {
    incomeTypes: Option[];
    setIncomeTypes: (incomeTypes: Option[]) => void;
}

const useAddIncomeStore = create<AddIncomeStore>((set) => ({
    incomeTypes: [],
    setIncomeTypes: (incomeTypes) => set({ incomeTypes }),
}));

export default useAddIncomeStore;