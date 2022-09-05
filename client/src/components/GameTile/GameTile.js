import React from "react";
import { GameTileData } from "./GameTitleData";
import './GameTile.css';

const GameTile = (props) => {

    let gameTile = props.game;

    console.log(props);

    //Create an onclick event that open the information obout the game catagory

    return(
        <div className="tile-layout">
            <div className="tile-image-outer">
                <img src={gameTile.img} alt={gameTile.alt} className='tile-image' />
            </div>
            <div className="tile-name">
                <span>
                    {gameTile.name}
                </span>
            </div>
        </div>
    )
}

export default GameTile