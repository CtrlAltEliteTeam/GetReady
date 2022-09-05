import React, {useState, useEffect} from "react";
import { GameTileData } from "../../components/GameTile/GameTitleData";
import GameTile from "../../components/GameTile/GameTile";
import { GameTile_TestData } from "../../components/GameTile/GameTitle_TestData";
import './Dashboard.css';

const Dashboard = () => {

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
    


    return(
        <div className="dashboard-page">
            <div className="dashboard-topbar">
                <div className="dashboard-heading">
                    <span>
                        Your Page
                    </span>
                </div>
            </div>
            <div className="user-tounaments-outer">
                <div className="user-tounaments-heading">
                    <span>
                        Your Tounaments
                    </span>
                </div>
                <div className="user-tounaments-inner">
                    {tournamentList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
                </div>
            </div>
            <div className="user-tounaments-outer">
                <div className="user-tounaments-heading">
                    <span>
                        Participating
                    </span>
                </div>
                <div className="user-tounaments-inner">
                    {tournamentList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
                </div>
            </div>
            <div className="user-tounaments-outer">
                <div className="user-tounaments-heading">
                    <span>
                        Tounament History
                    </span>
                </div>
                <div className="user-tounaments-inner">
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

export default Dashboard