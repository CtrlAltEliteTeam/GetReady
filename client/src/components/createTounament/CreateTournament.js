import React, { useState, useEffect, useContext } from 'react';
import * as AiIcons from 'react-icons/ai';
import './CreateTournament.css';
import axios from '../../api/Axois';
import { GameTileData } from "../GameTile/GameTileData";
import AuthContext from '../../api/AuthProvider';
import TournamentState from '../../api/TournamentState';
import {useNavigate} from 'react-router-dom';

const TITLE_REGEX=/^[A-z][A-z0-9-_!?]{3,23}$/;
const FETCH_GAMES_URL = "/get_games";
const CREATE_TOURNAMENT_URL = "/create_tournament";

const CreateTournament = (params) => {

    //let data = params.params;
    //console.log(JSON.stringify(data));

    const { auth } = useContext(AuthContext);
    const { data } = useContext(TournamentState);

    let navigate = useNavigate();

    const [tName, setTName] = useState('');
    const [validTName, setValidTName] = useState(false);

    const [tGame, setTGame] = useState("0");
    const [validTGame, setValidTGame] = useState(false);

    const [tDesc, setTDesc] = useState("");
    const [validTDesc, setValidTDesc] = useState(false);

    const [tsDate, setTsDate] = useState("none");
    const [validTsDate, setValidTsDate] = useState(false);

    const [tfDate, setTfDate] = useState("");
    const [validTfDate, setValidTfDate] = useState(false);

    

    const [tsTime, setTsTime] = useState("");
    const [validTsTime, setValidTsTime] = useState(false);

    const [tParticipants, setTParticipants] = useState(2);
    const [validTParticipants, setValidTParticipants] = useState(false);

    const [tPermission, setTPermission] = useState(false);

    const [gamesList, setGamesList] = useState([]);

    useEffect(() => {
        if (gamesList.length === 0) {
            const fetchGames = async () => {
                const response = await axios.post(FETCH_GAMES_URL,{});
                return await response?.data;
            }
            const res = fetchGames();
            const data = Promise.resolve(res);
            data.then((value) => {
                value.forEach(element => {
                    setGamesList(gamesList => [...gamesList,element]);
                });
            });
            gamesList.forEach(element => {
                //console.log(element);
            });
        }
    },[])

    const [image, setImage] = useState(data.img);
    const [alt, setAlt] = useState(data.alt);
    
    //fetch the list of games from the server
    useEffect(() => {
        let n = gamesList.find(o => o.game_id === parseInt(tGame));
        console.log(n);
        if (n != undefined) {
            let game = new GameTileData(0,"0",n.name,"-1",0,0);
            setImage(game.img);
            setAlt(game.alt);
        } else {
            let game = new GameTileData(0,"0","create","-1",0,0);
            setImage(game.img);
            setAlt(game.alt);
        } 
    }, [tGame])
    

    const goBack = () => {
        return navigate(-1);
    }

    // useEffect(() => {
    //     console.log(tGame);
    // }, [tGame])

    //validation use effects
    useEffect(() => {
        setValidTName(TITLE_REGEX.test(tName));
    }, [tName]);
    useEffect(() => {
        if (tDesc.length >= 300){
            setValidTDesc(true);
        }
    }, [tDesc]);
    useEffect(() => {
        let currDate = new Date();
        console.log(currDate.getDate());
        console.log(tsDate);
        if (tsDate >= currDate.getDate()){
            setValidTsDate(true);
        }
    }, [tsDate]);
    // useEffect(() => {
    //     if (tfDate < tsDate){
    //         setValidTfDate(true);
    //     }
    // }, [tfDate]);
    // useEffect(() => {
    //     let currDate = new Date();
    //     if (tsDate === currDate.getDate() && tsTime < currDate.getTime()){
    //         setValidTsTime(true);
    //     }
    // }, [tsTime]);
    // useEffect(() => {
    //     if ((tParticipants % 2) == 0 ){
    //         setValidTParticipants(true);
    //     } else {
    //         setValidTParticipants(false);
    //     }
    // }, [tParticipants]);
        

    //when the submit button is pressed the data is sent to the server to create a new tournament
    const handleSubmit = async (e) => {
        e.preventDefault();
        //var state = {id : 3}; //temp
        try {
            const response = await axios.post(CREATE_TOURNAMENT_URL,{
                user_id : auth.user_id,
                game_id : tGame,
                title : tName,
                description : tDesc,
                startDate : tsDate,
                endDate : tfDate,
                maxParticipants : tParticipants,
                startTime : tsTime,
                viewParticipant : tPermission,
                content : "TOURNAMENT",
            });
            console.log(response?.data);
            return navigate(-1);
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div>
        <div className="banner-createtournament">CREATE TOURNAMENT</div>
        <div className='tournament-create-outer'>
            <div className='tournament-create-back' onClick={goBack}>
                Cancel
            </div>
            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='tournament-create'>
                    <div className='tournament-create-header'>
                        <div className='tournament-create-header-image-container'>
                            <img src={image} alt={alt} className="tournament-create-header-image"/>
                        </div>
                        <div className='tournament-create-header-info'>
                            <div className='tournament-create-header-title'>
                            <input
                                type="name"
                                id="tname"
                                placeholder="Tournament Title"
                                value={tName}
                                onChange={(e) => setTName(e.target.value)}
                                required
                                autoComplete='off'
                            />
                            </div>
                            <div className='tournament-create-header-game'>
                                <select
                                    value={tGame}
                                    id="game"
                                    onChange={(e) => setTGame(e.target.value)}
                                >
                                    <option value="0" disabled>Select an Game</option>
                                    {gamesList.map(({ game_id, name }, index) => <option value={game_id} >{name}</option>)}
                                </select>
                            </div>
                            <div className='tournament-create-header-creator'>
                                {auth.username}
                            </div>
                        </div>
                    </div>
                    <div className='tournament-create-body'>
                        <div className='tournament-create-description'>
                            <textarea
                                type="info"
                                id="tdesc"
                                placeholder='Decription of tournament and any other relevant info'
                                value={tDesc}
                                onChange={(e) => setTDesc(e.target.value)}
                                required
                            />
                        </div>
                        <div className='tournament-create-date'>
                            Start Time:
                            <input
                                type="time"
                                id="ttime"
                                value={tsTime}
                                required
                                onChange={(e) => setTsTime(e.target.value)}
                            />
                        </div>
                        <div className='tournament-create-date'>
                            Start Date:
                            <input
                                type="date"
                                id="tdate"
                                value={tsDate}
                                onChange={(e) => setTsDate(e.target.value)}
                                required
                                placeholder="Tournament Name"
                            />
                        </div>
                        <div className='tournament-create-date'>
                            End Date:
                            <input
                                type="date"
                                id="tdate"
                                value={tfDate}
                                required
                                onChange={(e) => setTfDate(e.target.value)}
                            />
                        </div>
                        <div className="create-tournament-item-outer">
                            <div className="create-tournament-item-text">
                                Max Number of Participants
                            </div>
                            <div className="create-tournament-item">
                                <input
                                    type="number"
                                    id="tpart"
                                    value={tParticipants}
                                    required
                                    onChange={(e) => setTParticipants(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="create-item">
                            allow people to see who is participating?
                            <input
                                type="checkbox"
                                id="tpermission"
                                value={tPermission}
                                onChange={(e) => setTPermission(e.target.value)}
                            />
                        </div>
                    </div>
                    <p/>
                </div>
                <div className="create-item">
                    <div className="create-item-button">
                        <button id="create">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
        </div>
    )
}

export default CreateTournament