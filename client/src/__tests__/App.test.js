import { render, screen } from '@testing-library/react';
import ReactDOM from "react-dom/client";
import App from '../App';
import GameTile from '../components/GameTile/GameTile';
import Login from '../components/login/Login';
import Signup from '../components/login/Signup';
import Dashboard from '../pages/dashboard/Dashboard';


test('renders the landing page', () => {
  render(App);

});

test('renderLogin', () => {
  render(Login);
});

test('renderLogin', () => {
  render(Signup);
});

test('renderLogin', () => {
  render(GameTile);
});

test1('dash', () => {
  render(Dashboard);
});


