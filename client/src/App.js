
import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LandingPage from '../src/pages/landing/LandingPage';
import LoginPage from '../src/components/login/LoginPage';
import Signup from '../src/components/login/Signup';
import Dashboard from '../src/pages/dashboard/Dashboard';
import NavBar from './components/navbar/Navbar';
import MyToumanents from '../src/pages/myTourmanents/MyTounamentsPage';
import CreateTournament from '../src/components/createTounament/CreateTournament';
import Tournament from './components/tournament/Tournament';
import UserProfile from './pages/profile/UserProfile';


function App() {
	return (
	<>
		
			<NavBar />
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login' exact element={<LoginPage/>}/>
				<Route path='/signup' exact element={<Signup/>}/>
				<Route path='/dashboard' exact element={<Dashboard/>}/>
				<Route path='/mypage' exact element={<MyToumanents/>}/>
				<Route path='/profile' exact element={<UserProfile/>}/>
				<Route path='/create' exact element={<CreateTournament/>}/>
				<Route path='/details' exact element={<Tournament/>}/>
				<Route path='/profile' exact element={<UserProfile/>}/>
			</Routes>
		
    </>
	);
}

export default App
