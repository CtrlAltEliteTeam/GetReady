import { render, screen } from '@testing-library/react';
import GameTile from '../components/GameTile/GameTile';
import { GameTileData } from '../components/GameTile/GameTileData';
import Navbar from '../components/navbar/Navbar';

const tileData = new GameTileData(11,"Test","CSGO","TOURNAMENT",12,1);

// it("test game tile",() =>{
// 	render(<GameTile game={tileData}/>)

// 	//screen.debug();
// });

if("test navbar",() => {
	render(<Navbar />);

	screen.debug();
});