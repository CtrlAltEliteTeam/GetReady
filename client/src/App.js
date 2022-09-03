import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/login/LoginPage';
import Signup from './components/login/Signup';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
	return (
	<>
		<Router>
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login' exact element={<LoginPage/>}/>
				<Route path='/signup' exact element={<Signup/>}/>
				<Route path='/dashboard' exact element={<Dashboard/>}/>
			</Routes>
		</Router>
    </>
	);
}

export default App
