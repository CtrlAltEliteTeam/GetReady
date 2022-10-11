import React from 'react';
import { act, fireEvent, waitFor, cleanup } from "@testing-library/react";
import '@testing-library/jest-dom';
import Login from '../components/login/Login';
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

const fakeLogin = {
    email: "bob@test.com",
    password: "12345"
}

const fakeLoginReturn = {
    user_id : 2, 
    username: 'bob',
}

const fakeLoginBadReturn = {
    error : 301
}



describe('Login tests',() => {
    it('test success axios',()=>{
        mock.onPost("/login", fakeLogin).reply(200,fakeLoginReturn);
        axios.post("/login", fakeLogin).then(function (response) {
            expect(response.data).toEqual(fakeLoginReturn);
        });
    });
    it('test fail axios',()=>{
        mock.onPost("/login", fakeLogin).reply(200,fakeLoginBadReturn);
        axios.post("/login", fakeLogin).then(function (response) {
            expect(response.data).toEqual(fakeLoginBadReturn);
        });
    });
    it('test login',async () => {
        mock.onPost("/login", {email: 'test@gmail.com', password: 'pass123'}).reply(200,[fakeLoginReturn]);

        act(() => {
            ReactDOM.createRoot(container).render(< Login />);
        });
        const email = container.querySelector('#email');
        const password = container.querySelector('#password');
        const button = container.querySelector('button');

        fireEvent.change(email, {target: { value : 'test@gmail.com'}});
        fireEvent.change(password, {target: { value : 'pass123'}});

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

        const success = container.querySelector('div.return-success');

        expect(success.textContent).toEqual('2');
    });
    it('test login',async () => {
        mock.onPost("/login", {email: 'test@gmail.com', password: 'pass123'}).reply(200,fakeLoginBadReturn);

        act(() => {
            ReactDOM.createRoot(container).render(< Login />);
        });
        const email = container.querySelector('#email');
        const password = container.querySelector('#password');
        const button = container.querySelector('button');

        fireEvent.change(email, {target: { value : 'test@gmail.com'}});
        fireEvent.change(password, {target: { value : 'pass123'}});

        await act(() => {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        });

        const success = container.querySelector('p.errmsg');

        expect(success.textContent).toEqual('Incorrect Username or Password');
    });
});