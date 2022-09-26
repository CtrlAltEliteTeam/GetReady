import React, { useState, useEffect, useContext } from 'react';
import { TournamentData } from './TournamentData';
import { TournamentData_TestData } from './TournamentData_TestData';
import { GameTileData } from '../GameTile/GameTileData';
import * as AiIcons from 'react-icons/ai';
import './Tournament.css';
import axios from '../../api/Axois';
import { AuthContext } from '../../api/AuthProvider';

const TOURNAMENT_URL = "/get_tournament_details"

const Tournament = (params) => {

    let data = params.params;
    console.log(JSON.stringify(data));

    const [state] = useContext(AuthContext); 

    const [TournamentDetails, setTournamentDetails] = useState({});
    const [GameDetails, setGameDetails] = useState('');
    const [Participants, setParticipants] = useState([]);

    const [showParticipants, setShowParticipants] = useState(false);

    const [joinLeave, setJoinLeave] = useState('');

    //Axiose to fetch tournament details 
    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(TOURNAMENT_URL,{
                    //tournament_id : data.id,
                    tournament_id : 21,
                    user_id : 11
                });
                console.log(response?.data[0]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [TournamentDetails])

    //load test data
    useEffect(() => {
        let details = TournamentData_TestData[0];
        let t = details.tournament;
        setGameDetails(details.game.name);
        setTournamentDetails(t);
        details.participants.participants.forEach(element => {
            setParticipants(Participants => [...Participants,element.playerName]);
        });
    }, [TournamentDetails])

    
    const showParticipantsEvent = (e) => {
        if (!showParticipants){
            setShowParticipants(true);
        }
        if (showParticipants) {
            setShowParticipants(false);
        }
    }

    const handleJoin = (e) => {
        //axiose for join

    }
    //replace join with leave if user is participating

    return (
        <div className='tournament-details-outer'>
            <div className='tournament-spacer'/>
            <div className='tournament-details'>
                <div className='tournament-details-header'>
                    <div className='tournament-details-header-image-container'>
                        <img src={TournamentDetails.img} alt={TournamentDetails.alt} className="tournament-details-header-image"/>
                    </div>
                    <div className='tournament-details-header-info'>
                        <div className='tournament-details-header-title'>
                            {TournamentDetails.title}
                        </div>
                        <div className='tournament-details-header-game'>
                            {GameDetails}
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
                    Join
                </div>
            </div>
            <div className='tournament-spacer'/>
        </div>
    )
}

export default Tournament
