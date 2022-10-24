
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from '../src/pages/landing/LandingPage';
import LoginPage from '../src/components/login/LoginPage';
import Signup from '../src/components/login/Signup';
import Dashboard from '../src/pages/dashboard/Dashboard';
import NavBar from './components/navbar/Navbar';
import MyToumanents from '../src/pages/myTourmanents/MyTounamentsPage';
import CreateTournament from '../src/components/createTounament/CreateTournament';
import Tournament from './components/tournament/Tournament';
import UserProfile from './pages/profile/UserProfile';
import Search from './pages/search/Search';
import UpdateTournament from './components/updateTournament/UpdateTournament';
import TournamentBracket from './components/bracket/Bracket';


function App() {
	return (
	<>
		<Router>
			<NavBar />
			<Routes>
				<Route path='/' exact element={<LandingPage/>}/>
				<Route path='/login/login' exact element={<LoginPage/>}/>
				<Route path='/login/signup' exact element={<Signup/>}/>
				<Route path='/profile' exact element={<UserProfile/>}/>
				<Route path='/profile' exact element={<UserProfile/>}/>
				<Route path='/dashboard' exact element={<Dashboard/>}/>
				<Route path='/mypage' exact element={<MyToumanents/>}/>
				<Route path='/create' exact element={<CreateTournament/>}/>
				<Route path='/update' exact element={<UpdateTournament/>}/>
				<Route path='/details' exact element={<Tournament/>}/>
				<Route path='/search' exact element={<Search/>}/>
				<Route path='/bracket' exact element={<TournamentBracket/>}/>
			</Routes>
		</Router>
    </>
	);
}

export default App
