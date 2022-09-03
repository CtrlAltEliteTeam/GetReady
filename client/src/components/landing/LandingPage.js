import React, {useState, useEffect} from "react";
import { GameTileData } from "../GameTile/GameTileData";
import GameTile from "../GameTile/GameTile";
import { GameTile_TestData } from "../GameTile/GameTile_TestData";
import GetReady from '../../resources/img/GetReady.png';
import './LandingPage.css';


const LandingPage = () => {

    // Array of Tounaments
    const [tournamentList, setTournamentList] = useState([]);

    useEffect(() => {
        //Axios function to load the data into GameTileData objects 

    }, [])
    

    //Load sample data 
    useEffect(() => {
        GameTile_TestData.forEach(element => {
            let gameTile = new GameTileData(element.id,element.name,element.img,element.alt);
            setTournamentList(tournamentList => [...tournamentList,gameTile]);
        });
    }, [])
    


    return (
        <div className="landing-page">
            {/* this title will probably end up bering part of the navbar when it is done */}
            <div className="landing-topbar">
                <div className="landing-title">
                    <span>
                        Tournaments
                    </span>
                </div>
            </div>
            <div className="tourny-list-outer">
                <div className="tourny-list-inner">
                    {tournamentList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LandingPage