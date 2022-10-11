import React from 'react';
import { act } from "@testing-library/react";
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom/client';
import LoginButton from "../components/LoginButton/LoginButton";

const params1 = {path :'/login/', user_id:0}
const params2 = {path : null, user_id:0}
const params3 = {path : null, user_id:1}

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});


describe('login button', () => {
    it('show login buttons', () => { 
        act(() => {
            ReactDOM.createRoot(container).render(<LoginButton params={params1}/>);
        });
        console.log(container.innerHTML);
        const Login = container.querySelector("div.login-button-button-button");
        const Signup = container.querySelector("div.signup-button-button-button");

        expect(Login).toBeVisible();
        expect(Signup.textContent).toBe("Signup");

    });
    it('hide buttons', () => { 
        act(() => {
            ReactDOM.createRoot(container).render(<LoginButton params={params2}/>);
        });
        const Login = container.querySelector("div.login-button-button-button");
        const Signup = container.querySelector("div.signup-button-button-button");

        expect(Login.textContent).toBe("Login");
        expect(Signup.textContent).toBe("Signup");

    });
    it('show logout button', () => { 
        act(() => {
            ReactDOM.createRoot(container).render(<LoginButton params={params3}/>);
        });
        const Login = container.querySelector("div.login-button-button-button");

        expect(Login.textContent).toBe("Log Out");

    });
})



