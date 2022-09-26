import React, { useState, useEffect, useContext } from 'react';
import { TournamentData } from './TournamentData';
import { TournamentData_TestData } from './TournamentData_TestData';
import { GameTileData } from '../GameTile/GameTileData';
import * as AiIcons from 'react-icons/ai';
import './Tournament.css';
import axios from '../../api/Axois';
import { AuthContext } from '../../api/AuthProvider';

const TOURNAMENT_URL = "/get_tournament_details";
const PARTICIPANT_URL = "/";
const GET_JOIN_LEAVE_URL = "/is_participating";
const JOIN_URL = "/join_tournament";
const LEAVE_URL = "/leave_tournament";


const Tournament = (params) => {

    let data = params.params;
    //console.log(JSON.stringify(data));

    const [state] = useContext(AuthContext); 

    const [TournamentDetails, setTournamentDetails] = useState({});
    const [GameDetails, setGameDetails] = useState('');

    
    const [title, setTitle] = useState(data.name);
    const [image, setImage] = useState(data.img);
    const [alt, setAlt] = useState(data.alt);
    const [creator, setCreator] = useState("");
    const [game, setGame] = useState(data.game);
    const [sTime, setSTime] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");
    const [desc, setDesc] = useState("");
    const [currPart, setCurrPart] = useState(0);
    const [maxPart, setMaxPart] = useState(0);
    const [Participants, setParticipants] = useState([]);
    const [partPermission, setPartPermission] = useState(false);


    const [showParticipants, setShowParticipants] = useState(false);

    const [joinLeave, setJoinLeave] = useState(true);
    const [joinLeaveLable, setJoinLeaveLable] = useState("Join");
    
    //Axiose to fetch tournament details 
    useEffect(() => {
        const fetchTournament = async (e) => {
            try {
                const response = await axios.post(TOURNAMENT_URL,{
                    tournament_id : data.id,
                });
                //console.log(response?.data[0]);
                var details = response?.data;
                setCreator(details.user);
                setDesc(details.details);
                setSTime(details.startTime);
                setSDate(details.startDate);
                setEDate(details.endDate);
                setCurrPart(details.numParticipants);
                setMaxPart(details.maxParticipants);
                setPartPermission(details.viewParticipants);
            } catch (error) {
                //console.log(error);
            }
        }
        const fetchParticipants = async (e) => {
            try {
                const response = await axios.post(PARTICIPANT_URL,{
                    tournament_id : data.id,
                });
                var details = response?.data[0];
                if (Participants.length() != 0) {
                    details.participants.forEach(element => {
                        setParticipants(Participants => [...Participants,element.playerName]);
                    });
                }
            } catch (error) {
                //console.log(error);
            }
        }
        const fetchJoinLeave = async (e) => {
            try{
                const response = await axios.post(GET_JOIN_LEAVE_URL,{
                    tournament_id : data.id,
                    user_id : state.id,
                });
                
            } catch (error) {
            }
        }
        //fetchTournament();
        //fetchParticipants();
        //fetchJoinLeave();
    }, [])

    //change participants
    useEffect(() => {
        const fetchParticipants = async (e) => {
            setParticipants([]);
            try {
                const response = await axios.post(PARTICIPANT_URL,{
                    tournament_id : data.id,
                });
                var details = response?.data[0];
                details.participants.forEach(element => {
                    setParticipants(Participants => [...Participants,element.playerName]);
                });
            } catch (error) {
                //console.log(error);
            }
        }
        //fetchParticipants();
    }, [])
    
    //load test data
    useEffect(() => {
        let details = TournamentData_TestData[0];
        let t = details.tournament;
        setGameDetails(details.game.name);
        setTournamentDetails(t);
        details.participants.participants.forEach(element => {
            setParticipants(Participants => [...Participants,element.playerName]);
        });
    }, [])

    const showParticipantsEvent = (e) => {
        if (!showParticipants){
            setShowParticipants(true);
        }
        if (showParticipants) {
            setShowParticipants(false);
        }
    }

    const handleJoin = async (e) => {
        //axiose for join
        e.preventDefault();
        if (joinLeave === true){
            setJoinLeaveLable("Leave");
            setCurrPart(currPart + 1);
            // try {
            //     const response = await axios.post(JOIN_URL,{
            //         tournament_id : data.id,
            //         user_id : state.id,
            //     });
            //     setJoinLeaveLable("Leave");
            //     setParticipants([]);
            //     setCurrPart(currPart++);
            // } catch (error) {
                
            // }
        }
        if (joinLeave === false) {
            setJoinLeaveLable("Join");
            //     setParticipants([]);
            setCurrPart(currPart - 1);
            // try {
            //     const response = await axios.post(LEAVE_URL,{
            //         tournament_id : data.id,
            //         user_id : state.id,
            //     });
            //     setJoinLeaveLable("Join");
            //     setParticipants([]);
            //     setCurrPart(currPart--);
            // } catch (error) {
                
            // }
        }
    }
    //replace join with leave if user is participating

    return (
        <div className='tournament-details-outer'>
            <div className='tournament-spacer'/>
            <div className='tournament-details'>
                <div className='tournament-details-header'>
                    <div className='tournament-details-header-image-container'>
                        <img src={image} alt={alt} className="tournament-details-header-image"/>
                    </div>
                    <div className='tournament-details-header-info'>
                        <div className='tournament-details-header-title'>
                            {title}
                        </div>
                        <div className='tournament-details-header-game'>
                            {game}
                        </div>
                        <div className='tournament-details-header-creator'>
                            {TournamentDetails.creator}
                        </div>
                    </div>
                </div>
                <div className='tournament-details-body'>
                    <div className='tournament-details-description'>
                        {TournamentDetails.desc}
                    </div>
                    <div className='tournament-details-date'>
                        Start Time: {TournamentDetails.sTime}
                    </div>
                    <div className='tournament-details-date'>
                        Start Date: {TournamentDetails.sDate}
                    </div>
                    <div className='tournament-details-date'>
                        End Date: {TournamentDetails.eDate}
                    </div>
                </div>
                {TournamentDetails.participantsPermission ? (
                    <div className='tournament-details-partricipants'>
                        <div className='tournament-details-partricipants-expand'>
                            <div className="tournament-details-partricipants-expand-button" onClick={showParticipantsEvent}>
                                <div className={TournamentDetails.participantPermission ? "tournament-details-partricipants-expand-icon-visible" : "tournament-details-partricipants-expand-icon"}>
                                    {showParticipants ? (<AiIcons.AiOutlineDown/>) : (<AiIcons.AiOutlineRight/>)}
                                </div>
                                Participants:&nbsp; 
                            </div>
                            <div className='tournament-details-partricipants-display'>
                            {TournamentDetails.participants} / {TournamentDetails.participantsMax}
                            </div>
                        </div>
                        <div className='tournament-details-partricipants-list-container'>
                            <div className={showParticipants ? "tournament-details-partricipants-list-show" : "tournament-details-partricipants-list"}>
                                {Participants.map((element)=>{
                                    return(
                                        <div>
                                            {element}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>) : (
                        <div className='tournament-details-partricipants'>
                            Participants
                            <div className='tournament-details-partricipants-display'>
                                {TournamentDetails.participants} / {TournamentDetails.participantsMax}
                            </div>
                        </div>
                    )}
                <div className='tournament-details-bracket'>

                </div>
                <div className='tournament-details-join-button' onClick={handleJoin}>
                    {joinLeaveLable}
                </div>
            </div>
            <div className='tournament-spacer'/>
        </div>
    )
}

export default Tournament
