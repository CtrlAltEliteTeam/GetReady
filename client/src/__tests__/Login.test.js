import React from 'react';
import { act } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from '../components/login/Login';
import ReactDOM from 'react-dom/client';

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
            ReactDOM.createRoot(container).render(< Login />);
        });
        
    });
});