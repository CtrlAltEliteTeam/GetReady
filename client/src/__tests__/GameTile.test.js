import React from 'react';
import { render, screen, act, getByTestId } from "@testing-library/react";
import '@testing-library/jest-dom';
import GameTile from '../components/GameTile/GameTile';
import ReactDOM from 'react-dom/client';

const params1 = {user_id: 0, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "Tournament", user: 2, count : 1 }}
const params2 = {user_id: 2, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "Tournament", user: 2, count : 1 }}

let container;


describe('Game Tile tests',() => {
    it('content displayed correctly',() => {
        container = render(<GameTile params={params1}/>);

        const title = container.queryByTestId('TitleTest');
        const edit = container.queryByTestId('EditButton');
        console.log(edit.textContent);
        expect(title.textContent).toEqual(params1.game.name);
        expect(edit.textContent).toEqual("");
    })
    it('content displayed correctly with edit',() => {
        render(<GameTile params={params2}/>);
        
        const edit = screen.getByTestId("EditButton").textContent;
        console.log(edit);
    })
    
})