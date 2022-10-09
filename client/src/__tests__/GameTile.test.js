import React from 'react';
import { render, screen } from "@testing-library/react";
import LoginButton from "../components/LoginButton/LoginButton";

const mockedUsedNavigate = jest.fn();

const params = {path :'/login/'}

describe('login button', () => {
    it('show login buttons', () => { 
        render(<LoginButton params={params}/>);

        expect(screen.getByTestId("LoginButton")).toBe("Login");
    })
}) 

