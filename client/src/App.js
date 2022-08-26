import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './components/landing/LandingPage';
import Login from './components/login/Login';
import Signup from './components/login/Signup';


function App() {
	return (
	<>
		<Router>
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login' exact element={<Login/>}/>
				<Route path='/signup' exact element={<Signup/>}/>
			</Routes>
		</Router>
    </>
	);
}

export default App
