import { create } from "zustand";
import { ShortSummaryData } from "../../types/ShortSummaryData";
import { SixMonthsIncomeExpensesData } from "../../types/SixMonthsIncomeExpensesData";

type DashboardStore = {
    sixMonthsIncomeExpensesData: SixMonthsIncomeExpensesData;
    shortSummaryData: ShortSummaryData,

    setSixMonthsIncomeExpensesData: (data: SixMonthsIncomeExpensesData) => void;
    setShortSummaryData: (data: ShortSummaryData) => void;
}

const useDashboardStore = create<DashboardStore>((set) => ({
    sixMonthsIncomeExpensesData: {
        income: [],
        expense: [],
    },
    shortSummaryData: {
        income: 0,
        expenses: 0,
        savings: 0,
        unspecified: 0,
    },

    setSixMonthsIncomeExpensesData: (data) => set({ sixMonthsIncomeExpensesData: data }),
    setShortSummaryData: (data) => set({ shortSummaryData: data }),
}));

export default useDashboardStore;