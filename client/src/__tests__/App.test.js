import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import {BrowserRouter, MemoryRouter} from 'react-router-dom';
import React from 'react';


describe('App',()=>{

   
    it('render without crashing', async() => {
        render(<App />,{wrapper: BrowserRouter});
        const user = userEvent.setup();

        expect(screen.getByTestId("landing-page")).toBeInTheDocument()

        //expect(result).toMatch
    });
})
