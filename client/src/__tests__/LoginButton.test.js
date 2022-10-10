import React from 'react';
import { render, screen } from "@testing-library/react";
import LoginButton from "../components/LoginButton/LoginButton";

const mockedUsedNavigate = jest.fn();

const params1 = {path :'/login/', user_id:0}
const params2 = {path : null, user_id:0}
const params3 = {path : null, user_id:1}


describe('login button', () => {
    it('show login buttons', () => { 
        render(<LoginButton params={params1}/>);
        
        expect(screen.getByText("Login"))
        expect(screen.getByText("Signup"))

    }),
    it('still show login buttons',() => {
        render(<LoginButton params={params2}/>);
        
        expect(screen.getByText("Login"))
        expect(screen.getByText("Signup"))
    })
    it('show log out button',() => {
        render(<LoginButton params={params3}/>);
        
        expect(screen.getByText("Log Out"))
    })
})



