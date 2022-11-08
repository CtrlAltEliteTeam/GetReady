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
import { ContactUs } from "../../components/ContactUs/ContactUs";

const MY_TOURNAMENTS_URL = "/get_my_tournaments";
const MY_JOINED_URL = "/get_joined_tournaments";

const MyTounaments = () => {

    const [tournamentList, setTournamentList] = useState([]);
    const [pastTournamentList, setPastTournamentList] = useState([]);
    const [joinTournamentList, setJoinTournamentList] = useState([]);
    const [pastJoinTournamentList, setPastJoinTournamentList] = useState([]);
    const [show, setShow] = useState(false);

    let navigate = useNavigate();

    const { auth } = useContext(AuthContext);
    console.log(auth.user_id);

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
                        if (element.status == "Ongoing" || element.status == "Upcoming") {
                            setTournamentList(tournamentList => [...tournamentList,gameTile]);
                        }
                        if (element.status == "Past"){
                            setPastTournamentList(pastTournamentList => [...pastTournamentList,gameTile]);
                        }
                        count++;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(MY_JOINED_URL,{
                    user_id : auth.user_id
                });
                console.log(response?.data);
                var data = response?.data;
                let count = 0;
                if ( joinTournamentList.length === 0){
                    data.forEach(element => {
                        let gameTile = new GameTileData(element.tournament_id,element.title,element.name,element.content,element.user_id,count);
                        if (element.status == "Ongoing" || element.status == "Upcoming") {
                            setJoinTournamentList(joinTournamentList => [...joinTournamentList,gameTile]);
                        }
                        if (element.status == "Past"){
                            setPastJoinTournamentList(pastJoinTournamentList => [...pastJoinTournamentList,gameTile]);
                        }
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
        return navigate('/create');
    }

    const stopOverlay = () => {
        setShow(false);
    }

    return(
        <div>
            
            <div className="spacer"></div>
            <div className="banner-mytournament">MY TOURNAMENTS</div> 
            <div className="my-tournaments-page">
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
                <div className="my-tournaments-games-list-outer">
                    <div className="my-tournaments-games-list-heading">
                        Current Tournaments
                    </div>
                    
                    <div className="my-tournaments-create-container">
                        <div onClick={createTounament} className="create-button">
                            <GameTile game={createNew}/>
                        </div>
                        <div className="my-tourny-list-inner">
                        <div>
                            {tournamentList.map((element)=>{
                                return(
                                    <GameTile game={element} key={element.id}/>
                                )
                            })}
                        </div>
                    </div>
                    </div>
                </div>
                { !(pastTournamentList.length === 0) ? (
                    <div className="my-tournaments-games-list-outer">
                        <div className="my-tournaments-games-list-heading">
                            Finished Tounaments
                        </div>
                        <div className="my-tournaments-games-list-inner">
                            {pastTournamentList.map((element)=>{
                                return(
                                    <GameTile game={element} key={element.id}/>
                                )
                            })}
                        </div>
                    </div> ) : (
                        null)
                }
                { !(joinTournamentList.length === 0) ? (
                    <div className="my-tournaments-games-list-outer">
                        <div className="my-tournaments-games-list-heading">
                            Currently Participating
                        </div>
                        <div className="my-tournaments-games-list-inner">
                            {joinTournamentList.map((element)=>{
                                return(
                                    <GameTile game={element} key={element.id}/>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    null
                )}
                { !(pastJoinTournamentList.length === 0) ? (
                    <div className="my-tournaments-games-list-outer">
                        <div className="games-list-heading">
                            Past Participation
                        </div>
                        <div className="my-tournaments-games-list-inner">
                            {pastJoinTournamentList.map((element)=>{
                                return(
                                    <GameTile game={element} key={element.id}/>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    null
                )}
                
            </div>
            <div className="contact-us-mytournament">
            <ContactUs />
            </div>
        </div>
    )
}

export default MyTounaments