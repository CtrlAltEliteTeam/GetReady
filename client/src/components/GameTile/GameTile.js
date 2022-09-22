import React, { useState, useContext, useEffect } from "react";
import { GameTileData } from "./GameTileData";
import {FiEdit} from "react-icons/fi";
import './GameTile.css';
import { AuthContext } from "../../api/AuthProvider";
import  CreateTournament  from "../createTounament/CreateTournament";

const GameTile = (props) => {

    let gameTile = props.game;

    const [state] = useContext(AuthContext);
    const [editPermission, setEditPermission] = useState(false);
    const [displayContent, setDisplayContent] = useState(true);
    const [overlay, setOverlay] = useState(false);

    useEffect(() => {
        //console.log(state.id + " : " + gameTile.user);
        if(state.id == gameTile.user){
            setEditPermission(true);
        } else if (state.id != gameTile.user){
            setEditPermission(false);
        }
    }, [state.id])

    const showDetails = () => {
        if (displayContent){
            setOverlay(true);
        } else {
            console.log("game");
        }
    }

    const stopOverlay = () => {
        setOverlay(false);
    }

    const editDetails = (e) => {
        e.stopPropagation();
        console.log("edit");
    }
    
    return(
        <>
            <div className={overlay ? "tournament-overlay-active" : "tournament-overlay"}>
                <div className="tournament-overlay-screen" onClick={stopOverlay}>

                </div>
                <div className="tournament-edit-outer">
                    <CreateTournament/>
                </div>
            </div>
            <div key={gameTile.count} className="tile-layout" >
                <div className="tile-image-outer">
                    <img src={gameTile.img} alt={gameTile.alt} className='tile-image' onClick={showDetails} />
                </div>
                <div className="tile-info">
                    <div className="tile-name" onClick={showDetails}>
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