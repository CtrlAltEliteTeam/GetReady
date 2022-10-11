import React from 'react';
import { act, fireEvent, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Tournament from '../components/tournament/Tournament';
import ReactDOM from 'react-dom/client';

import axios from '../api/Axois';
import MockAdapter from 'axios-mock-adapter';

var mock = new MockAdapter(axios);

beforeAll(() => {
    mock.reset();
});

afterEach(cleanup);

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const game = {
    id : 1, 
    name: 'fortnite tourny', 
    game: 'Fortnite', 
    img: "Fortnite" , 
    alt : "TournamentImage", 
    content : "TOURNAMENT", 
    user: 2, 
    count : 1 
}

const fakeTournament = [{
    username : "bob",
    description : 'sample',
    startTime : "10:00 am",
    startDate : "08/12/2022",
    endDate : "10/12/2022",
    numParticipants: 12,
    maxParticipants: 25,
    viewParticipant: true
}]

const fakeJoinLeaveInitial = {
    joinLeave : false
};

const fakeParticipants = [
    {
        id : 1,
        username : 'john'
    },
    {
        id : 2,
        username : 'roy'
    },
    {
        id : 3,
        username : 'may'
    },
];

const fakeJoin = {
    result : true
};
const fakeLeave = {
    result : false
};

const params = {user_id : 2 , game : game}


describe('Tournament Axios',() => {
    it('fetch Tournament',() => {
        mock.onPost("/get_tournament_details", {tournament_id : 1}).reply(200,fakeTournament);
        axios.post("/get_tournament_details", {tournament_id : 1}).then(function (response) {
            expect(response.data).toEqual(fakeTournament);
        });
    });
    it('fetch Participants',() => {
        mock.onPost("/get_participants", {tournament_id : 1}).reply(200,fakeParticipants);
        axios.post("/get_participants", {tournament_id : 1}).then(function (response) {
            expect(response.data).toEqual(fakeParticipants);
        });
    });
    it('fetch JoinLeave Initial State',() => {
        mock.onPost("/is_participating", {tournament_id : 1, user_id : 2}).reply(200,fakeJoinLeaveInitial);
        axios.post("/is_participating", {tournament_id : 1, user_id: 2}).then(function (response) {
            expect(response.data).toEqual(fakeJoinLeaveInitial);
        });
    });
    it('set Join',() => {
        mock.onPost("/join_tournament", {tournament_id : 1, user_id : 2}).reply(200,fakeJoin);
        axios.post("/join_tournament", {tournament_id : 1, user_id : 2
        }).then(function (response) {
            expect(response.data).toEqual(fakeJoin);
        });
    });
    it('set Leave',() => {
        mock.onPost("/join_tournament", {tournament_id : 1, user_id : 2}).reply(200,fakeLeave);
        axios.post("/join_tournament", {tournament_id : 1, user_id : 2
        }).then(function (response) {
            expect(response.data).toEqual(fakeLeave);
        });
    });
});

describe('Tournament Tests',() => {
    it('display initial data correctly',async () => {
        mock.onPost("/get_tournament_details", {tournament_id : 1}).reply(200,fakeTournament);
        mock.onPost("/get_participants", {tournament_id : 1}).reply(200,fakeParticipants);
        mock.onPost("/is_participating", {tournament_id : 1, user_id : 2}).reply(200,fakeJoinLeaveInitial);
        mock.onPost("/join_tournament", {tournament_id : 1, user_id : 2}).reply(200,fakeJoin);

        await act(() => {
            ReactDOM.createRoot(container).render(<Tournament params={params} />);
        });
        const label = container.querySelector('div.tournament-details-header-title');
        const pic = container.querySelector('img.tournament-details-header-image');
        const gameTitle = container.querySelector('div.tournament-details-header-game');
        const creator = container.querySelector('div.tournament-details-header-creator');
        const desc = container.querySelector('div.tournament-details-description');
        const time = container.querySelector('div.tournament-details-date-time');
        const start = container.querySelector('div.tournament-details-date-start');
        const end = container.querySelector('div.tournament-details-date-end');
        const parts = container.querySelector('div.tournament-details-partricipants-display');


        expect(label.textContent).toBe('fortnite tourny');
        expect(pic.src).toBe(`http://localhost/Fortnite`);
        expect(pic.alt).toBe("TournamentImage");
        expect(gameTitle.textContent).toBe("Fortnite");
        expect(creator.textContent).toBe("bob");
        expect(desc.textContent).toBe("sample");
        expect(time.textContent).toBe("Start Time: 10:00 am");
        expect(start.textContent).toBe("Start Date: 08/12/2022");
        expect(end.textContent).toBe("End Date: 10/12/2022");
        expect(parts.textContent).toBe("12 / 25");
    });
    it('display participants',async () => {
        mock.onPost("/get_tournament_details", {tournament_id : 1}).reply(200,fakeTournament);
        mock.onPost("/get_participants", {tournament_id : 1}).reply(200,fakeParticipants);
        mock.onPost("/is_participating", {tournament_id : 1, user_id : 2}).reply(200,fakeJoinLeaveInitial);
        mock.onPost("/join_tournament", {tournament_id : 1, user_id : 2}).reply(200,fakeJoin);

        await act(() => {
            ReactDOM.createRoot(container).render(<Tournament params={params} />);
        });

        const parts = container.querySelector('div.tournament-details-partricipants-list');
        expect(parts.textContent).toBe("johnroymay");

    });
    it('join',async () => {
        mock.onPost("/get_tournament_details", {tournament_id : 1}).reply(200,fakeTournament);
        mock.onPost("/get_participants", {tournament_id : 1}).reply(200,fakeParticipants);
        mock.onPost("/is_participating", {tournament_id : 1, user_id : 2}).reply(200,fakeJoinLeaveInitial);
        mock.onPost("/join_tournament", {tournament_id : 1, user_id : 2}).reply(200,fakeJoin);

        await act(() => {
            ReactDOM.createRoot(container).render(<Tournament params={params} />);
        });

        const button = container.querySelector("div.tournament-details-join-button-show");

        expect(button.textContent).toBe("Join");

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

        expect(button.textContent).toBe("Leave");

    });
});