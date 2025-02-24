import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ROUTES } from './constants/routes';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import { SwrProvider } from './providers/swrProvider';
import React from 'react';
import Loader from './components/Loader/Loader';

const AddEntry = React.lazy(() => import('./pages/AddEntryPage/AddEntryPage'));
const AddExpenses = React.lazy(
    () => import('./pages/AddExpensesPage/AddExpensesPage'),
);
const AddIncome = React.lazy(
    () => import('./pages/AddIncomePage/AddIncomePage'),
);
const Dashboard = React.lazy(
    () => import('./pages/DashboardPage/DashboardPage'),
);
const DetailedSummary = React.lazy(
    () => import('./pages/DetailedSummaryPage/DetailedSummaryPage'),
);
const Account = React.lazy(() => import('./pages/AccountPage/AccountPage'));
const Statistics = React.lazy(
    () => import('./pages/StatisticsPage/StatisticsPage'),
);
const TransactionDetails = React.lazy(
    () => import('./pages/TransactionDetailsPage/TransactionDetailsPage'),
);
const Login = React.lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
    return (
        <SwrProvider>
            <SnackbarProvider
                maxSnack={3}
                autoHideDuration={2500}
                preventDuplicate={true}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                style={{ bottom: '100px', position: 'absolute', width: '100%' }}
            >
                <BrowserRouter>
                    <Header />
                    <React.Suspense fallback={<Loader />}>
                        <Routes>
                            <Route
                                path={ROUTES.ADD_ENTRY.route}
                                element={<AddEntry />}
                            />
                            <Route
                                path={ROUTES.ADD_EXPENSES.route}
                                element={<AddExpenses />}
                            />
                            <Route
                                path={ROUTES.ADD_INCOME.route}
                                element={<AddIncome />}
                            />
                            <Route
                                path={ROUTES.DASHBOARD.route}
                                element={<Dashboard />}
                            />
                            <Route
                                path={ROUTES.DETAILED_SUMMARY.route}
                                element={<DetailedSummary />}
                            />
                            <Route
                                path={ROUTES.ACCOUNT.route}
                                element={<Account />}
                            />
                            <Route
                                path={ROUTES.SAVINGS.route}
                                element={<div>Savings Page</div>}
                            />
                            <Route
                                path={ROUTES.STATISTICS.route}
                                element={<Statistics />}
                            />
                            <Route
                                path={ROUTES.SETTINGS.route}
                                element={<div>Settings Page</div>}
                            />
                            <Route
                                path={ROUTES.TRANSACTION_DETAILS.route + '/:id'}
                                element={<TransactionDetails />}
                            />
                            <Route
                                path={ROUTES.LOGIN.route}
                                element={<Login />}
                            />
                        </Routes>
                    </React.Suspense>
                    <Footer />
                </BrowserRouter>
            </SnackbarProvider>
        </SwrProvider>
    );
}

export default App;
