import React, { useState, useEffect } from 'react';
import { TournamentData } from './TournamentData';
import { TournamentData_TestData } from './TournamentData_TestData';
import { GameTileData } from '../GameTile/GameTileData';
import './Tournament.css';

const Tournament = (params) => {

    const [TournamentDetails, setTournamentDetails] = useState({});
    const [GameDetails, setGameDetails] = useState('');
    const [Participant, setParticipant] = useState([]);


    //Axiose to fetch tournament details 
    useEffect(() => {

    }, [TournamentDetails])

    //load test data
    useEffect(() => {
        let details = TournamentData_TestData[0];
        let t = details.tournament;
        //console.log("d: " +JSON.stringify(details));
        setGameDetails(details.game.name);
        setTournamentDetails(t);
        //let tourmanent = new TournamentData(t.id,t.title,game,t.img,t.alt,t.desc,t.creator,t.sTime,t.sDate,t.eDate,t.partisipants,t.partisipantsMax);
        details.participants.participants.forEach(element => {
            setParticipant(Participant => [...Participant,element.playerName]);
        });
    }, [TournamentDetails])
    

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
                <div className='tournament-details-partricipants'>
                    <div className='tournament-details-partricipants-button'>
                        <div>
                            Participants
                        </div>
                    </div>
                    <div className='tournament-details-partricipants-display'>
                        {TournamentDetails.participants} / {TournamentDetails.participantsMax}
                    </div>
                </div>
                <div className='tournament-details-bracket'>

                </div>
                <div className='tournament-details-join-button'>
                    Join
                </div>
            </div>
            <div className='tournament-spacer'/>
        </div>
    )
}

export default Tournament
