import React, { useState, useEffect, useContext } from 'react';
import { TournamentData } from './TournamentData';
import { TournamentData_TestData } from './TournamentData_TestData';
import { GameTileData } from '../GameTile/GameTileData';
import * as AiIcons from 'react-icons/ai';
import './Tournament.css';
import axios from '../../api/Axois';
import AuthContext from '../../api/AuthProvider';
import SeedView from '../seeding/SeedView';
import TournamentBracket from '../bracket/Bracket';
import TournamentState from '../../api/TournamentState';
import {useNavigate} from 'react-router-dom';
import {FiEdit} from "react-icons/fi";

const TOURNAMENT_URL = "/get_tournament_details";
const PARTICIPANT_URL = "/get_participants";
const GET_JOIN_LEAVE_URL = "/is_participating";
const JOIN_URL = "/join_tournament";

const END_REGISTRATION_URL = "/end_registration";

const Tournament = (params) => {

    //let data = params.params;
    //console.log(JSON.stringify(data));

    const { auth } = useContext(AuthContext);
    const { data } = useContext(TournamentState);

    let navigate = useNavigate();

    const [TournamentDetails, setTournamentDetails] = useState({});
    const [GameDetails, setGameDetails] = useState('');

    const [details, setDetails] = useState({});

    const [showJoinLeave, setShowJoinLeave] = useState(false);
    
    const [title, setTitle] = useState(data.name);
    const [image, setImage] = useState(data.img);
    const [alt, setAlt] = useState(data.alt);
    const [creatorID, setCreatorID] = useState(0);
    const [creatorName, setCreatorName] = useState("");
    const [game, setGame] = useState(data.game);
    const [sTime, setSTime] = useState("");
    const [sDate, setSDate] = useState("");
    const [eDate, setEDate] = useState("");
    const [desc, setDesc] = useState("");
    const [currPart, setCurrPart] = useState(0);
    const [maxPart, setMaxPart] = useState(0);
    const [winner_username, setWinnerUsername] = useState("");
    const [state, setState] = useState(0);

    const [fetchParts, setFetchParts] = useState(0);
    const [Participants, setParticipants] = useState([]);
    const [partPermission, setPartPermission] = useState(false);

    const [showParticipants, setShowParticipants] = useState(false);

    //const [joinedResponse, setJoinedResponse] = useState({});
    const [joinLeave, setJoinLeave] = useState(false); //false if not joined
    const [joinLeaveLable, setJoinLeaveLable] = useState("Join");

    var isCreator = false;
    if(creatorID==auth.user_id){
        isCreator = true;
    }
    
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

    //updates the tournament details if any changes happen
    useEffect(()=>{
        setCreatorID(details[0]?.user_id);
        setCreatorName(details[0]?.username);
        setDesc(details[0]?.description);
        setSTime(details[0]?.startTime);
        setSDate(details[0]?.startDate.substring(0, 10));
        setEDate(details[0]?.endDate.substring(0, 10));
        setCurrPart(details[0]?.numParticipants);
        setMaxPart(details[0]?.maxParticipants);
        setPartPermission(details[0]?.viewParticipant);
        setWinnerUsername(details[0]?.winner_username);
        setState(details[0]?.state);
    },[details])

    //change participants if user joins or leaves
    useEffect(() => {
        setParticipants([]);
        const fetchParticipants = async (e) => {
            try {
                const response = await axios.post(PARTICIPANT_URL,{
                    tournament_id : data.id,
                });
                //console.log(response?.data);
                response?.data.forEach(element => {
                    setParticipants(Participants => [...Participants,element]);
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchParticipants();
    }, [fetchParts]);

    //updates the page to show if tournaments are currently meant to be shown or hidden
    const showParticipantsEvent = (e) => {
        if (!showParticipants){
            console.log(Participants);
            setShowParticipants(true);
        }
        if (showParticipants) {
            setShowParticipants(false);
        }
    }
    const goBack = () => {
        return navigate(-1);
    }

    const updateClick = () => {
        return navigate("/update");
    }

    //checks with the server to see if the current user that is logged in is participating in this tournament or not
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post(GET_JOIN_LEAVE_URL,{
                tournament_id : data.id,
                user_id : auth.user_id,
            });
            const joinSet = response?.data
            //console.log(joinSet.joinLeave);
            if (joinSet.joinLeave === false){
                setJoinLeaveLable("Join");
            } else {
                setJoinLeaveLable("Leave");
            }
        }
        fetchData();
        // const temp = Promise.resolve(res);
        // temp.then((value) => {
        //     setJoinLeave(value.joinLeave);
        // });
    }, [])

    //handels a user joining or leaving a tournamet based on its current state and updates the button to reflect the server response
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

    const handleEndRegistration = async(e) => {
        setState(1);
        try {
            const response = await axios.post(END_REGISTRATION_URL,{
                tournament_id : data.id,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <div className="spacer"></div>
        <div className="banner-tournament">TOURNAMENT</div>
            <div className='tournament-details-outer'>
                <div className='tournament-details-back' onClick={goBack}>
                    <AiIcons.AiOutlineClose />
                </div>
                { (auth.user_id === data.user) ? (
                    <div onClick={updateClick} className="t-edit-button-active">
                        <FiEdit className="edit-button-symbol" />
                    </div>
                ) : (
                    null
                )}
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
                                {creatorName}
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
                        <div className='tournament-details-date'>
                            Winner: {winner_username}
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
                                            <div key={element.username}>
                                                {element.username}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                                    
                        </div>) : (
                            <div className='tournament-details-partricipants'>
                                <div className='tournament-details-partricipants-expand'>
                                    <div className="tournament-details-partricipants-expand-button" onClick={showParticipantsEvent}>
                                        {/* <div className={partPermission ? "tournament-details-partricipants-expand-icon-visible" : "tournament-details-partricipants-expand-icon"}>
                                            {showParticipants ? (<AiIcons.AiOutlineDown/>) : (<AiIcons.AiOutlineRight/>)}
                                        </div> */}
                                        Participants:&nbsp; 
                                    </div>
                                    <div className='tournament-details-partricipants-display'>
                                        {currPart} / {maxPart}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {state == 0 ||(state!=1 & state!=2 & state!=3) ? 
                        (   
                            <div>
                                {isCreator ? (<div className="end-registration" onClick={handleEndRegistration}>End registration</div>) : (<></>)}
                                <div className={showJoinLeave? 'tournament-details-join-button-show' : 'tournament-details-join-button'} onClick={handleJoin}>
                                        {joinLeaveLable}
                                </div>   
                            </div>
                        ) 
                        :(<></>)
                    }
                    {state == 1 && isCreator? 
                        (
                            <div div className='tournament-bracket-box'>
                                <SeedView tournament_id={data.id} setState={setState}/>
                            </div>
                        ) 
                        :(<></>)
                    }
                    {state == 2 || state == 3 ? 
                        (
                            
                            <div className='tournament-bracket-box'>
                                <TournamentBracket tournament_id={data.id} isCreator={isCreator} setState={setState}/>
                            </div>
                        ) 
                        :(<></>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Tournament
