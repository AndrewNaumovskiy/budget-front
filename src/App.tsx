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
                        path={ROUTES.ADD_EXPENSES}
                        element={<AddExpensesPage />}
                    />
                    <Route
                        path={ROUTES.ADD_INCOME}
                        element={<AddIncomePage />}
                    />
                    <Route
                        path={ROUTES.DETAILED_SUMMARY}
                        element={<DetailedSummaryPage />}
                    />
                    <Route
                        path={ROUTES.ACCOUNT}
                        element={<div>Account Page</div>}
                    />
                    <Route
                        path={ROUTES.SAVINGS}
                        element={<div>Savings Page</div>}
                    />
                    <Route
                        path={ROUTES.STATISTICS}
                        element={<div>Statistics Page</div>}
                    />
                    <Route
                        path={ROUTES.DASHBOARD}
                        element={<DashboardPage />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </SnackbarProvider>
    );
}

export default App;
