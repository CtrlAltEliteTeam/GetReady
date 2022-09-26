import React, { useState, useContext, useEffect } from "react";
import { GameTileData } from "./GameTileData";
import {FiEdit} from "react-icons/fi";
import './GameTile.css';
import { AuthContext } from "../../api/AuthProvider";
import  CreateTournament  from "../createTounament/CreateTournament";
import Tournament from "../tournament/Tournament";

const GameTile = (props) => {

    let gameTile = props.game;

    const [state] = useContext(AuthContext);
    const [editPermission, setEditPermission] = useState(false);
    const [task, setTask] = useState(true);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        //console.log(state.id + " : " + gameTile.user);
        if(state.id === gameTile.user){
            setEditPermission(true);
        } else if (state.id !== gameTile.user){
            setEditPermission(false);
        }
    }, [state.id])

    const showDetails = () => {
        if (gameTile.content === "GAME"){
            setOverlay(true);
            setTask(1);
        }
        if (gameTile.content === "TOURNAMENT"){
            setOverlay(true);
            setTask(2);
        }
    }

    const stopOverlay = () => {
        setOverlay(false);
        setTask(0);
    }

    const editDetails = (e) => {
        e.stopPropagation();
        setOverlay(true);
        setTask(3)
    }
        
        return(
            <>
            <div className={overlay ? "tournament-overlay-active" : "tournament-overlay"}>
                <div className="tournament-overlay-screen" onClick={stopOverlay}></div>
                    {task === 1 && (
                        <div className="tournament-view-outer">
                            <Tournament params={gameTile}/>
                        </div>
                    )}
                    {task === 2 && (
                        <div className="tournament-edit-outer">
                            <CreateTournament/>
                        </div>
                    )}
                    {task === 3 && (
                        <div className="tournament-edit-outer">
                            <CreateTournament/>
                        </div>
                    )}
            </div>
            <div key={gameTile.count} className="tile-layout" onClick={showDetails} >
                <div className="tile-image-outer">
                    <img src={gameTile.img} alt={gameTile.alt} className='tile-image' />
                </div>
                <div className="tile-info">
                    <div className="tile-name">
                        <span>
                            {gameTile.name}
                        </span>
                    </div>
                    <div className={editPermission ? "tile-edit-button-active" : "tile-edit-button"} onClick={editDetails}>
                        <FiEdit className="edit-button-symbol" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default GameTile