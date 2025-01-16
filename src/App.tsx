import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Routes } from 'react-router';

import AddExpensesPage from './pages/AddExpensesPage';
import AddIncomePage from './pages/AddIncomePage';
import { ROUTES } from './constants/routes';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import DetailedSummaryPage from './pages/DetailedSummaryPage/DetailedSummaryPage';

function App() {
    return (
        <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2500}
            preventDuplicate={true}
        >
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route
                        path={ROUTES.ADD_EXPENSES.route}
                        element={<AddExpensesPage />}
                    />
                    <Route
                        path={ROUTES.ADD_INCOME.route}
                        element={<AddIncomePage />}
                    />
                    <Route
                        path={ROUTES.DASHBOARD.route}
                        element={<DashboardPage />}
                    />
                    <Route
                        path={ROUTES.DETAILED_SUMMARY.route}
                        element={<DetailedSummaryPage />}
                    />
                    <Route
                        path={ROUTES.ACCOUNT.route}
                        element={<div>Account Page</div>}
                    />
                    <Route
                        path={ROUTES.SAVINGS.route}
                        element={<div>Savings Page</div>}
                    />
                    <Route
                        path={ROUTES.STATISTICS.route}
                        element={<div>Statistics Page</div>}
                    />
                    <Route
                        path={ROUTES.SETTINGS.route}
                        element={<div>Settings Page</div>}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
