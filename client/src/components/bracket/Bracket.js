import React, { useEffect, useState } from 'react';
import TournamentGUI from './bracketComponents/TournamentGUI';
import axios from '../../api/Axois';
import './Bracket.css';
import {Bracket, Round, Match, Entrant, BRACKET, WINNERS_BRACKET, LOSERS_BRACKET} from '../bracket/Classes_Constants';

const GET_BRACKETJSON_URL = "/get_bracketJSON";
const SEND_JSON_URL = "/send_bracketJSON";
const END_TOURNAMENT_URL = "/end_tournament";
const SET_WINNER_URL = "/set_winner";

function TournamentBracket({tournament_id, isCreator, setState}){
    const [tournament, setTournament] = useState([]);

    useEffect(() => {
        const fetchData = async (e) => {
            try {
                const response = await axios.post(GET_BRACKETJSON_URL,{
                    tournament_id : tournament_id,
                });

                var serial = response?.data[0].bracketJSON;
                var deserializedTournament = deserializeTournament(JSON.parse(serial));
                setTournament((deserializedTournament.map(item=>{
                    return {...item};
                })));
            } catch (error) {
                //console.log(error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const sendData = async (e) => {
            if(tournament.length>0){
                try {
                    const response = await axios.post(SEND_JSON_URL,{
                        tournament_json: JSON.stringify(tournament),
                        tournament_id : tournament_id,
                    });
                } catch (error) {
                    console.log(error);
                }

                if(tournament[0].winner!=null){
                    setState(3);

                    //update state change state to 3
                    try {
                        const response = await axios.post(END_TOURNAMENT_URL,{
                            tournament_id : tournament_id,
                        });
                    } catch (error) {
                        console.log(error);
                    }

                    //set winner
                    try {
                        const response = await axios.post(SET_WINNER_URL,{
                            tournament_winner: tournament[0].winner.getName(),
                            tournament_id : tournament_id,
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
        sendData();

    }, [tournament])

    const [viewBracket, setViewBracket] = useState(false);
    const showBracket = (e)=>{
        if(viewBracket){
            setViewBracket(false);
        }
        if(!viewBracket){
            setViewBracket(true);
        }
    }


    return(
        <div>
            {viewBracket ? (  
                <div>
                    <div className='tournament-bracket-closeBtn' onClick={showBracket}>&times;</div>
                    <TournamentGUI tournament={tournament} setTournament={setTournament} isCreator={isCreator}/>
                </div>
                ):( 
                <div>
                    <div className="tournament-bracket-btn" onClick={showBracket}>View Tournament Bracket</div>
                </div>
            )}
              
        </div>   
    
    )
}
export default TournamentBracket



function deserializeTournament(serializedTournament) {//BACKEND, used after JSON fetched from database
    var tournament = [];

    for(let i = 0; i < serializedTournament.length; i++){
        var bracket = new Bracket('');
        Object.assign(bracket, serializedTournament[i]);

        for(let j = 0; j < serializedTournament[i].rounds.length; j++){
            var round = new Round(-1);
            Object.assign(round, serializedTournament[i].rounds[j]);
            bracket.rounds[j] = round;

            for (let k = 0; k < serializedTournament[i].rounds[j].matches.length; k++){
                var match = new Match(-1);
                Object.assign(match, serializedTournament[i].rounds[j].matches[k])
                bracket.rounds[j].matches[k] = match;

                for (let l = 0; l < serializedTournament[i].rounds[j].matches[k].entrants.length; l++){
                    var entrant = new Entrant();
                    Object.assign(entrant, serializedTournament[i].rounds[j].matches[k].entrants[l]);
                    bracket.rounds[j].matches[k].entrants[l] = entrant;
                }
            }
        }
        tournament.push(bracket);
    }
    return tournament;
}