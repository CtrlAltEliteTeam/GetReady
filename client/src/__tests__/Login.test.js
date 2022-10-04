import React, { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/login/Login';
import { AuthProvider } from '../api/AuthProvider';

test('render header', () =>{
    render(<AuthProvider value = "0" > <Login /> </AuthProvider>);
    const getHeadingElement = screen.getByTestId("test");
    expect(getHeadingElement).toBeInTheDocument();
});