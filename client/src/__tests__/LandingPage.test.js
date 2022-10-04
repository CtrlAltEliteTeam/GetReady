import React, { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../pages/landing/LandingPage';

test('render header', () =>{
    render(<LandingPage />);
    const getHeadingElement = screen.queryByText('Get Ready');
    expect(getHeadingElement).toBeInTheDocument();
});