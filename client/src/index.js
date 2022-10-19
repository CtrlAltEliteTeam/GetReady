import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './api/AuthProvider';
import { TournamentState } from './api/TournamentState';
import { SearchState } from './api/SearchState';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvider>
		<TournamentState>
			<SearchState>
				<App />
			</SearchState>
		</TournamentState>
	</AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
