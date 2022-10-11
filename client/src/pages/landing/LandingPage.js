import React, { useState, useEffect } from "react";
import { GameTileData } from "../../components/GameTile/GameTileData";
import GameTile from "../../components/GameTile/GameTile";
import { GameTile_TestData } from "../../components/GameTile/GameTitle_TestData";
import './LandingPage.css';
import axios from "../../api/Axois";

const GET_TOURMANENT_SHORT_URL = "/get_tournament_short";

const LandingPage = () => {

    // Array of Tounaments

    const [featuredList, setFeaturedList] = useState([]);
    const [featuredName, setFeaturedName] = useState("Featured Tournaments");

    const [gamesList, setGamesList] = useState([]);
    const [gamesListName, setGamesListName] = useState("Popular Games");
        

    //Load data of games
    useEffect(() => {
        let count =0;
        if ( gamesList.length === 0){
            GameTile_TestData.forEach(element => {
                //console.log(JSON.stringify(element));
                let gameTile = new GameTileData(element.id,element.name,element.game,element.content,element.user_id,count);
                setGamesList(gamesList => [...gamesList,gameTile]);
                count++;
            });
        }
    }, [])

    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(GET_TOURMANENT_SHORT_URL,{});
                console.log(response?.data);
                var data = response?.data;
                let count = 0;
                if ( featuredList.length === 0){
                    data.forEach(element => {
                        //removed for stubbing object tested seperatly
                        //let gameTile = new GameTileData(element.tournament_id,element.title,element.name,element.content,element.user_id,count);
                        //console.log(gameTile.id);
                        setFeaturedList(featuredList => [...featuredList,element]);
                        count++;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
        <div className="spacer"></div>
        <div className="landing-page">
            <div className="games-list-outer">
                <div className="games-list-heading">
                    {gamesListName}
                </div>
                <div className="games-list-inner">
                    {gamesList.map((element)=>{
                        return( //changed for testing
                            <div key={element.id}>
                                {element.name}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="tourny-list-outer">
                <div  className="tournament-list-heading">
                    {featuredName}
                </div>
                <div className="tourny-list-inner">
                    {featuredList.map((element)=>{
                        return( //hanged for testing
                            <div key={element.id}>
                                {element.name}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage