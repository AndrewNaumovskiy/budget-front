import { Route } from "../types/Route";

export const ROUTES: { [key: string]: Route } = {
    ADD_EXPENSES: {
        name: 'Add Expenses',
        route: '/add-expenses',
    },
    ADD_INCOME: {
        name: 'Add Income',
        route: '/add-income',
    },
    DASHBOARD: {
        name: 'Dashboard',
        route: '/',
    },
    DETAILED_SUMMARY: {
        name: 'Detailed Summary',
        route: '/detailed-summary',
    },
    ACCOUNT: {
        name: 'Account',
        route: '/account',
    },
    SAVINGS: {
        name: 'Savings',
        route: '/savings',
    },
    STATISTICS: {
        name: 'Statistics',
        route: '/statistics',
    },

}