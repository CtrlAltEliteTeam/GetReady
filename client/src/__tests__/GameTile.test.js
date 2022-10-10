import React from 'react';
import { render, screen, act, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import GameTile from '../components/GameTile/GameTile';
import { GameTileData } from '../components/GameTile/GameTileData';
import ReactDOM from 'react-dom/client';
import ReactTestUtils from 'react-dom/test-utils';

//var ReactTestUtils = require('react-dom/test-utils'); 

const params1 = {user_id: 0, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "TOURNAMENT", user: 2, count : 1 }, editPermission : false}
const params2 = {user_id: 0, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "GAME", user: 2, count : 1 },  editPermission : false}
const params3 = {user_id: 2, game:{id : 1, name: 'fortnite tourny', game: 'Fortnite', img: "Fortnite" , alt : "TournamentImage", content : "TOURNAMENT", user: 2, count : 1 },  editPermission : true}
let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('Game Tile tests',() => {
    it('display data correctly',() => {
        // Test first render and componentDidMount
        act(() => {
            ReactDOM.createRoot(container).render(<GameTile params={params1} />);
        });
        const label = container.querySelector('div.tile-name');
        const pic = container.querySelector('img.tile-image');

        expect(container.querySelector('div.tile-edit-button')).toBeVisible();
        expect(label.textContent).toBe(params1.game.name);
        expect(pic.src).toBe(`http://localhost/Fortnite`);
        expect(pic.alt).toBe("TournamentImage");
    });
    it('on click for tournament',() => {
        act(() => {
            ReactDOM.createRoot(container).render(<GameTile params={params1} />);
        });

        const button = container.querySelector('div.tile-layout');

        act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(container.querySelector('div.tournament-view-outer')).toBeVisible();
        expect(container.querySelector('div.tournament-overlay-active')).toBeVisible();

        const buttonClose = container.querySelector('div.tournament-overlay-screen');

        act(() => {
            buttonClose.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(container.querySelector('div.tournament-overlay')).toBeVisible();

    });
    it('on click for game',() => {
        act(() => {
            ReactDOM.createRoot(container).render(<GameTile params={params2} />);
        });

        const button = container.querySelector('div.tile-layout');

        act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(container.querySelector('div.tournament-game-outer')).toBeVisible();
        expect(container.querySelector('div.tournament-overlay-active')).toBeVisible();

        const buttonClose = container.querySelector('div.tournament-overlay-screen');

        act(() => {
            buttonClose.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(container.querySelector('div.tournament-overlay')).toBeVisible();

    });
    it('on click for edit',() => {
        act(() => {
            ReactDOM.createRoot(container).render(<GameTile params={params3} />);
        });
        
        expect(container.querySelector('div.tile-edit-button-active')).toBeVisible();

        const button = container.querySelector('div.tile-edit-button-active');

        act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(container.querySelector('div.tournament-edit-outer')).toBeVisible();
        expect(container.querySelector('div.tournament-overlay-active')).toBeVisible();

        const buttonClose = container.querySelector('div.tournament-overlay-screen');

        act(() => {
            buttonClose.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        expect(container.querySelector('div.tournament-overlay')).toBeVisible();

    });
});

describe('Game Tile data tests',() => {
    it('Object Correct',() => {

        const tile = new GameTileData(1,'fortnite tourny', 'Fortnite', "TOURNAMENT" ,1)

    });
});