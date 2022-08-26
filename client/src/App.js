import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/login/LoginPage';
import Login from './components/login/LoginPage';


function App() {
	return (
	<>
		<Router>
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login' exact element={<LoginPage/>}/>
			</Routes>
		</Router>
    </>
	);
}

export default App
