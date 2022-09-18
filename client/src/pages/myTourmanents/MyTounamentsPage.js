import React, {useContext, useState, useEffect} from "react";
import { GameTileData } from "../../components/GameTile/GameTitleData";
import GameTile from "../../components/GameTile/GameTile";
import { GameTile_TestData } from "../../components/GameTile/GameTitle_TestData";
import { useNavigate } from "react-router-dom";
import "./MyTournaments.css";
import BigPlus from "../../resources/img/BigPlus.jpg";
import CreateTournament from "../../components/createTounament/CreateTournament";

const MyTounaments = () => {

    const [tournamentList, setTournamentList] = useState([]);
    const [show, setShow] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        GameTile_TestData.forEach(element => {
            let gameTile = new GameTileData(element.id,element.name,element.img,element.alt);
            setTournamentList(tournamentList => [...tournamentList,gameTile]);
        });
    }, [])

    let createNew = new GameTileData(0,"Create Tounament",BigPlus,'create tounament img');

    const createTounament = () => {
        console.log("I have renderd");
        setShow(true);
    }


    return(
        <div>
            <div>
                {show ? <CreateTournament/> : console.log("no show")}
                <div className="create-tounament-wrapper" onClick={createTounament}>
                    <GameTile game={createNew} />
                </div>
                {tournamentList.map((element)=>{
                    return(
                        <GameTile game={element}/>
                    )
                })}
            </div>
        </div>
    )
}

export default MyTounaments