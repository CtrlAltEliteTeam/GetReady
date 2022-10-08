import React, {useContext, useState, useEffect} from "react";
import { GameTileData } from "../../components/GameTile/GameTileData";
import GameTile from "../../components/GameTile/GameTile";
import { GameTile_TestData } from "../../components/GameTile/GameTitle_TestData";
import { useNavigate } from "react-router-dom";
import "./MyTournaments.css";
import BigPlus from "../../resources/img/BigPlus.jpg";
import CreateTournament from "../../components/createTounament/CreateTournament";
import AuthContext from "../../api/AuthProvider";
import axios from "../../api/Axois";

const MY_TOURNAMENTS_URL = "/get_my_tournaments";

const MyTounaments = () => {

    const [tournamentList, setTournamentList] = useState([]);
    const [show, setShow] = useState(false);

    let navigate = useNavigate();

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(MY_TOURNAMENTS_URL,{
                    user_id : auth.user_id

                });
                console.log(response?.data);
                var data = response?.data;
                let count = 0;
                if ( tournamentList.length === 0){
                    data.forEach(element => {
                        let gameTile = new GameTileData(element.tournament_id,element.title,element.name,element.content,element.user_id,count);
                        setTournamentList(tournamentList => [...tournamentList,gameTile]);
                        count++;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    let createNew = new GameTileData(0,"Create Tournament","create","create",'0',0);

    const createTounament = () => {
        setShow(true);
    }

    const stopOverlay = () => {
        setShow(false);
    }

    return(
        <>
            <div className={show ? "my-tournament-overlay-active" : "my-tournament-overlay"}>
                <div className="my-tournament-overlay-screen" onClick={stopOverlay}></div>
                <div>
                    {show ? 
                        <div className="create-tounament-wrapper">
                            <CreateTournament/>
                        </div> 
                    : null }
                </div>
            </div>
            <div className="my-tournaments">
                <div onClick={createTounament}>
                    <GameTile game={createNew}/>
                </div>
                    {tournamentList.map((element)=>{
                        return(
                            <GameTile game={element}/>
                        )
                    })}
            </div>
        </>
    )
}

export default MyTounaments