import { SnackbarProvider } from 'notistack'
import { BrowserRouter, Route, Routes } from 'react-router'

import AddExpensesPage from './pages/AddExpensesPage'
import AddIncomePage from './pages/AddIncomePage'

function App() {
	return (
		<SnackbarProvider
			maxSnack={3}
			autoHideDuration={2500}
			preventDuplicate={true}>
			<BrowserRouter>
				<Routes>
					<Route path="/addexpenses" element={<AddExpensesPage />} />
					<Route path="/addincome" element={<AddIncomePage />} />

					{/* <Route element={<RequireAuth />}>
						<Route path="/" element={<ClassesPage />} />

						<Route path="/group">
							<Route path=":id" element={<StudentsPage />} />
						</Route>

						<Route path="/student">
							<Route path=":id" element={<StudentInfoPage />} />
						</Route>

						<Route path="/schedule" element={<ReschedulePage />} />
					</Route> */}
				</Routes>
			</BrowserRouter>
		</SnackbarProvider>
	)
}

export default App
