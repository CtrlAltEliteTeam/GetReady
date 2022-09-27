import { render, screen } from '@testing-library/react';
import GameTile from '../components/GameTile/GameTile';

it("test game tile",() =>{
	render(<GameTile/>)

	//screen.debug();
});
