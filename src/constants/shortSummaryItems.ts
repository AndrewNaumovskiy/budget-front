import { ShortSummaryItem } from "../types/ShortSummaryItem";

export const SHORT_SUMMARY_ITEMS: { [key: string]: ShortSummaryItem } = {
    income: {
        label: 'Income',
        pointColor: '#00bd00',
    },
    expenses: {
        label: 'Expenses',
        pointColor: '#e30000',
    },
    savings: {
        label: 'Savings',
        pointColor: '#7d7e77',
    },
    unspecified: {
        label: 'Unspecified',
        pointColor: '#bea100',
    },
}