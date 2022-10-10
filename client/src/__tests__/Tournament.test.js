// import React from 'react';
// import { act } from "@testing-library/react";
// import '@testing-library/jest-dom';
// import Tournament from '../components/tournament/Tournament';
// import ReactDOM from 'react-dom/client';
// import axios from '../api/Axois';

// const params1 = {user_id: {user_id : 0}, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "TOURNAMENT", user: 2, count : 1 }}

// let container;

// jest.mock("axios");

// beforeEach(() => {
//     container = document.createElement('div');
//     document.body.appendChild(container);
// });

// afterEach(() => {
//     document.body.removeChild(container);
//     container = null;
// });

// describe('Tournament Tests',() => {
//     it('display initial data correctly', () => {
//         act(() => {
//             ReactDOM.createRoot(container).render(<Tournament params={params1} />);
//         });
//         const label = container.querySelector('div.tournament-details-header-title');
//         const pic = container.querySelector('img.tournament-details-header-image');
//         const gameTitle = container.querySelector('div.tournament-details-header-game');


//         expect(label.textContent).toBe(params1.game.name);
//         expect(pic.src).toBe(`http://localhost/Fortnite`);
//         expect(pic.alt).toBe("TournamentImage");
//         expect(gameTitle.textContent).toBe(params1.game.game);
//     });
//     // it('mock axios',async () => {
//     //     const fakeTournament = {
//     //         username : "bob",
//     //         description : 'sample',
//     //         startTime : "10:00 am",
//     //         startDate : "08/12/2022",
//     //         endDate : "10/12/2022",
//     //         numParticipants: 12,
//     //         maxParticipants: 25,
//     //         viewParticipant: false
//     //     };
//     //     const fakeJoinLeaveInitial = {
//     //         value : false
//     //     };

//     //     axios.post.mockResolvedValue({ data: fakeTournament });
//     //     axios.post.mockResolvedValue({ data: fakeJoinLeaveInitial });

//     //     act(() => {
//     //         ReactDOM.createRoot(container).render(<Tournament params={params1} />);
//     //     });

//     // });
// });

