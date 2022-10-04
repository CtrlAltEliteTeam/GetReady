import React, { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameTile from '../components/GameTile/GameTile';

test('render game tile component', () =>{
    render(<GameTile />);
    const getTileElement = screen.getByTestId("gameTile-1");
    expect(getTileElement).toBeInTheDocument();
});
