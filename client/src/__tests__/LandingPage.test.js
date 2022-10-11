import React from 'react';
import { act, render, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import LandingPage from "../pages/landing/LandingPage";
import ReactDOM from 'react-dom/client';

import axios from '../api/Axois';
import MockAdapter from 'axios-mock-adapter';

let container;
var mock = new MockAdapter(axios);

beforeAll(() => {
    mock.reset();
});
  
afterEach(cleanup);

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const fakeTournaments = [
    {
        id: 1,
        name: 'Fortnite',
        game: "Fortnite",
        content: 'GAME',
        user: 1,
    },
    {
        id: 2,
        name: 'League of Legends',
        game: "League of Legends",
        content: 'GAME',
        user: 2,
    },
    {
        id: 3,
        name: 'Counter Strike: GO',
        game: "CSGO",
        content: 'GAME',
        user: 8,
    },
]

describe('Landing Page Tests',() => {
    it('Headings Displayed correctly',() => {
        act(() => {
            ReactDOM.createRoot(container).render(<LandingPage />);
        });
        const gamesHeading = container.querySelector('div.games-list-heading');
        const tournamentHeading = container.querySelector('div.tournament-list-heading');

        expect(gamesHeading.textContent).toBe("Popular Games");
        expect(tournamentHeading.textContent).toBe("Featured Tournaments");
    });
    it('expect axios pass', async () => {
        mock.onPost("/get_tournament_short", {}).reply(200,fakeTournaments);
        axios.post("/get_tournament_short", {}).then(function (response) {
            expect(response.data).toEqual(fakeTournaments);
        });
    });
    it('axios loads into lists', async () => {
        mock.onPost("/get_tournament_short", {}).reply(200,fakeTournaments);
        await act(() => {
            ReactDOM.createRoot(container).render(<LandingPage />);
        });
        const games = container.querySelector("div.games-list-inner");
        const tournaments = container.querySelector("div.tourny-list-inner");
        console.log(games.innerHTML);
        console.log(tournaments.innerHTML);
    });

});