import React from 'react';
import { act } from "@testing-library/react";
import '@testing-library/jest-dom';
import GameTile from '../components/GameTile/GameTile';
import { GameTileData } from '../components/GameTile/GameTileData';
import ReactDOM from 'react-dom/client';

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

        const tile = new GameTileData(1,'fortnite tourny', 'Fortnite', "TOURNAMENT" ,2, 1);

        expect(tile.id).toEqual(1);
        expect(tile.name).toEqual('fortnite tourny');
        expect(tile.game).toEqual('Fortnite');
        expect(tile.alt).toEqual('TournamentImage');
        expect(tile.content).toEqual('TOURNAMENT');
        expect(tile.user).toEqual(2);
        expect(tile.count).toEqual(1);
    });
    it('Image Correct',() => {

        const tile1 = new GameTileData(1,'fortnite tourny', 'Fortnite', "TOURNAMENT" ,2, 1);
        expect(tile1.img).toEqual('');

        const tile2 = new GameTileData(1,'fortnite tourny', 'League of Legends', "TOURNAMENT" ,2, 1);
        expect(tile2.img).toEqual('');

        const tile3 = new GameTileData(1,'fortnite tourny', 'CSGO', "TOURNAMENT" ,2, 1);
        expect(tile3.img).toEqual('');

        const tile4 = new GameTileData(1,'fortnite tourny', 'Halo', "TOURNAMENT" ,2, 1);
        expect(tile4.img).toEqual('');

        const tile5 = new GameTileData(1,'fortnite tourny', 'Super Smash bros', "TOURNAMENT" ,2, 1);
        expect(tile5.img).toEqual('');

        const tile6 = new GameTileData(1,'fortnite tourny', 'Tekken 7', "TOURNAMENT" ,2, 1);
        expect(tile6.img).toEqual('');

        const tile7 = new GameTileData(1,'fortnite tourny', 'pacman', "TOURNAMENT" ,2, 1);
        expect(tile7.img).toEqual('');

        const tile8 = new GameTileData(1,'fortnite tourny', 'create', "TOURNAMENT" ,2, 1);
        expect(tile8.img).toEqual('');

    });

});