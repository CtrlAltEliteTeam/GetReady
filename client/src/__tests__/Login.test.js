import React from 'react';
import { act, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from '../components/login/Login';
import ReactDOM from 'react-dom/client';
import * as axios from 'axios';

let container;
axios.post = jest.fn();

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('Game Tile tests',() => {
    it('test login',() => {
        act(() => {
            ReactDOM.createRoot(container).render(< Login />);
        });
        const email = container.querySelector('#email');
        const password = container.querySelector('#password');
        const button = container.querySelector('button');

        console.log(password.value);
        console.log(button);

        fireEvent.change(email, {target: { value : 'test@gmail.com'}});
        fireEvent.change(password, {target: { value : 'pass123'}});

        jest.mock("axios");

        axios.post.mockResolvedValue({ data: {user_id : 2, username: 'bob'} });

        act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });
        
        //axios.post.mockImplementation(() => Promise.reject({  }));
        
    });
});