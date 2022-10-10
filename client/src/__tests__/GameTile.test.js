import React from 'react';
import { render, screen, act } from "@testing-library/react";
import GameTile from '../components/GameTile/GameTile';

const params1 = {user_id: 0, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "Tournament", user: 2, count : 1 }}

describe('Game Tile tests',() => {
    it('',() => {
        act(() => {
            render(<GameTile params={params1}/>, container);
        })

        const title = contaner.que
        //expect(screen.getByText("fortnite tourny"))
    })
})