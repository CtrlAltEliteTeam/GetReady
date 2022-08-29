import React from "react";
import { GameTileData } from "./GameTileData";
import './GameTile.css';

const GameTile = (props) => {

    let gameTile = props;

    //Create an onclick event that open the information obout the game catagory

    return(
        <div>
            <div>
                <img src={gameTile.img} alt={gameTile.alt} />
            </div>
            <div>
                <span>
                    {gameTile.name}
                </span>
            </div>
        </div>
    )
}

export default GameTile