import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Route, Routes } from 'react-router'

import AddExpensesPage from './pages/AddExpensesPage'
import AddIncomePage from './pages/AddIncomePage'
import { ROUTES } from './constants/routes'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import Header from './components/Header'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {
	return (
		<SnackbarProvider
			maxSnack={3}
			autoHideDuration={2500}
			preventDuplicate={true}>
			<BrowserRouter>
					<Header/>
				<Routes>
					<Route path={ROUTES.ADD_EXPENSES} element={<AddExpensesPage />} />
					<Route path={ROUTES.ADD_INCOME} element={<AddIncomePage />} />
					<Route path={ROUTES.DASHBOARD} element={<DashboardPage/>} />
				</Routes>
					<Footer/>
			</BrowserRouter>
		</SnackbarProvider>
	)
}

export default App
