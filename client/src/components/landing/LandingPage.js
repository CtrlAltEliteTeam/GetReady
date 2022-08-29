import React, {useState, useEffect} from "react";
import { GameTileData } from "../GameTile/GameTileData";
import GameTile from "../GameTile/GameTile";


const LandingPage = () => {

    // Array of Tounaments
    const [tournament, setTournament] = useState({});
    const [tournamentList, setTournamentList] = useState([]);

    useEffect(() => {
        //Axios function to load the data into GameTileData objects 

    }, [])
    

    //Load sample data 
    useEffect(() => {
    
    }, [])
    


    return (
        <div>
            <div>
                <span>
                    Tournaments
                </span>
            </div>
            <div>
                <GameTile />
            </div>
        </div>
    )
}

export default LandingPage