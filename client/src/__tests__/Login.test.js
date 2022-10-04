import React, { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/login/Login';

test('render header', () =>{
    render(<Login />);
    const getHeadingElement = screen.getByTestId("test");
    expect(getHeadingElement).toBeInTheDocument();
});