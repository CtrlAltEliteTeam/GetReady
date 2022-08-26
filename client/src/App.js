import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/login/LoginPage';
import Signup from './components/login/Signup';


function App() {
	return (
	<>
		<Router>
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login' exact element={<LoginPage/>}/>
				<Route path='/signup' exact element={<Signup/>}/>
			</Routes>
		</Router>
    </>
	);
}

export default App
