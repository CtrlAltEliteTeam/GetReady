import React, { useState, useEffect, useContext } from 'react';
import { TournamentData } from './TournamentData';
import { TournamentData_TestData } from './TournamentData_TestData';
import { GameTileData } from '../GameTile/GameTileData';
import * as AiIcons from 'react-icons/ai';
import './Tournament.css';
import axios from '../../api/Axois';
import AuthContext from '../../api/AuthProvider';
import TournamentBracket from '../bracket/Bracket';

const TOURNAMENT_URL = "/get_tournament_details";
const PARTICIPANT_URL = "/get_participants";
const GET_JOIN_LEAVE_URL = "/is_participating";
const JOIN_URL = "/join_tournament";


const Tournament = (params) => {

    let data = params.params;
    //console.log(JSON.stringify(data));

    const { auth } = useContext(AuthContext);

    const [TournamentDetails, setTournamentDetails] = useState({});
    const [GameDetails, setGameDetails] = useState('');

    const [details, setDetails] = useState({});

    const [showJoinLeave, setShowJoinLeave] = useState(false);
    
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

    const [fetchParts, setFetchParts] = useState(0);
    const [Participants, setParticipants] = useState([]);
    const [partPermission, setPartPermission] = useState(false);

    const [showParticipants, setShowParticipants] = useState(false);

    //const [joinedResponse, setJoinedResponse] = useState({});
    const [joinLeave, setJoinLeave] = useState(false); //false if not joined
    const [joinLeaveLable, setJoinLeaveLable] = useState("Join");
    
    //joinleaveshowButton
    useEffect (() => {
        if(auth.user_id != 0) {
            setShowJoinLeave(true);
        } else { 
            setShowJoinLeave(false)
        }
    }, [auth.user_id]);

    //Axiose to fetch tournament details 
    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(TOURNAMENT_URL,{
                    tournament_id : data.id,
                });
                setDetails(response?.data);
            } catch (error) {
                //console.log(error);
            }
        }
        fetchData();
    }, [])

    useEffect(()=>{
        setCreator(details[0]?.username);
        setDesc(details[0]?.description);
        setSTime(details[0]?.startTime);
        setSDate(details[0]?.startDate.substring(0, 10));
        setEDate(details[0]?.endDate.substring(0, 10));
        setCurrPart(details[0]?.numParticipants);
        setMaxPart(details[0]?.maxParticipants);
        setPartPermission(details[0]?.viewParticipant);
    },[details])

    //change participants
    useEffect(() => {
        setParticipants([]);
        const fetchParticipants = async (e) => {
            try {
                const response = await axios.post(PARTICIPANT_URL,{
                    tournament_id : data.id,
                });
                console.log(response?.data);
                response?.data.forEach(element => {
                    setParticipants(Participants => [...Participants,element]);
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchParticipants();
    }, [fetchParts]);

    const showParticipantsEvent = (e) => {
        if (!showParticipants){
            setShowParticipants(true);
        }
        if (showParticipants) {
            setShowParticipants(false);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(GET_JOIN_LEAVE_URL,{
                tournament_id : data.id,
                user_id : auth.user_id,
            });
            return await response?.data;
        }
        const res = fetchData();
        const temp = Promise.resolve(res);
        temp.then((value) => {
            setJoinLeave(value.joinLeave);
            console.log(joinLeave);
            if (value.joinLeave === false){
                setJoinLeaveLable("Join");
            } else {
                setJoinLeaveLable("Leave");
            }
        });
    }, [])

    const handleJoin = async (e) => {
        //axiose for join
        var t = currPart;
        console.log("value on press: " + currPart + ", recorded value: " + t);
        try {
            const response = await axios.post(JOIN_URL,{
                tournament_id : data.id,
                user_id : auth.user_id,
            });
            setJoinLeave(response?.data?.result);
            if (response?.data?.result === false){
                setJoinLeaveLable("Join");
                t--;
                setCurrPart(t);
                setFetchParts(2);
            } else {
                setJoinLeaveLable("Leave");
                t++;
                setCurrPart(t);
                setFetchParts(3);
            }
        } catch (error) {
            console.log(error);
        }
        console.log("value after press: " + currPart + ", recorded value: " + t);
    }

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
                            {creator}
                        </div>
                    </div>
                </div>
                <div className='tournament-details-body'>
                    <div className='tournament-details-description'>
                        {desc}
                    </div>
                    <div className='tournament-details-date'>
                        Start Time: {sTime}
                    </div>
                    <div className='tournament-details-date'>
                        Start Date: {sDate}
                    </div>
                    <div className='tournament-details-date'>
                        End Date: {eDate}
                    </div>
                </div>
                {partPermission ? (
                    <div className='tournament-details-partricipants'>
                        <div className='tournament-details-partricipants-expand'>
                            <div className="tournament-details-partricipants-expand-button" onClick={showParticipantsEvent}>
                                <div className={partPermission ? "tournament-details-partricipants-expand-icon-visible" : "tournament-details-partricipants-expand-icon"}>
                                    {showParticipants ? (<AiIcons.AiOutlineDown/>) : (<AiIcons.AiOutlineRight/>)}
                                </div>
                                Participants:&nbsp; 
                            </div>
                            <div className='tournament-details-partricipants-display'>
                            {currPart} / {maxPart}
                            </div>
                        </div>
                        <div className='tournament-details-partricipants-list-container'>
                            <div className={showParticipants ? "tournament-details-partricipants-list-show" : "tournament-details-partricipants-list"}>
                                {Participants.map((element)=>{
                                    return(
                                        <div>
                                            {element.username}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='tournament-bracket-box'>
                                <TournamentBracket maxPart={maxPart} Participants={Participants}/>
                            </div>
                        </div>
                                
                    </div>) : (
                        <div className='tournament-details-partricipants'>
                                Participants:&nbsp;
                            <div className='tournament-details-partricipants-display'>
                                {currPart} / {maxPart}
                            </div>
                        </div>
                    )}
                <div className='tournament-details-bracket'>

                </div>
                <div className={showJoinLeave? 'tournament-details-join-button-show' : 'tournament-details-join-button'} onClick={handleJoin}>
                    {joinLeaveLable}
                </div>
            </div>
            <div className='tournament-spacer'/>
        </div>
    )
}

export default Tournament
