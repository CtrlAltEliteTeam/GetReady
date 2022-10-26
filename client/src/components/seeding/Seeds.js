import React, {useState} from 'react'
import Seed from './Seed';
import axios from '../../api/Axois';
import './Seeding.css';
import {Bracket, Round, Match, Entrant, BRACKET, WINNERS_BRACKET, LOSERS_BRACKET} from '../bracket/Classes_Constants';

const SET_SEED_URL = "/set_seed";
const END_SEEDING_URL = "/end_seeding";
const SEND_JSON_URL = "/send_bracketJSON";

const Seeds = ({seeds, setSeeds, setViewSeeds, tournament_id, setState}) => {

  const handleUpdateSeeding = async(e) => {
    for(let i = 0; i < seeds.size; i++){
        try {
            const response = await axios.post(SET_SEED_URL,{
                tournament_id : tournament_id,
                seed: i,
                username: seeds.get(i),
            });
        } catch (error) {
            console.log(error);
        }
    }
  };


  const handleEndSeeding = async(e) => {
    var tournament = [];
    var entrants = [];
    for(let i = 0; i < seeds.size; i++){
        entrants.push(seeds.get(i));
    }
    generateTournament(tournament, entrants);

    
    setState(2);
    //change state to 2
    try {
        const response = await axios.post(END_SEEDING_URL,{
            tournament_id : tournament_id,
        });
    } catch (error) {
        console.log(error);
    }

    //upload tournament json
    try {
        const response = await axios.post(SEND_JSON_URL,{
            tournament_json: JSON.stringify(tournament),
            tournament_id : tournament_id,
        });
    } catch (error) {
        console.log(error);
    }
  };




  return (
    <div>
        {[...seeds].map((entrant, i) =>
          <Seed key={i} seeds={seeds} setSeeds={setSeeds} seed={i} entrant={seeds.get(i).toString()}/>
        )}
        <button id="updateSeeding" onClick={handleUpdateSeeding}>Update Seeds</button>
        <button id="endSeeding" onClick={handleEndSeeding}>End Seeding</button>
    </div>
  )
}

export default Seeds




function generateTournament(tournament, entrants){
    singleElim(tournament, entrants);   
}
  
function singleElim(tournament, entrants){
    var bracket = new Bracket(BRACKET);
    const roundNumbers = getRoundRumbers(entrants.length);
    generateBracketJS(bracket, entrants, roundNumbers);
    tournament.push(bracket);
}
  
function getRoundRumbers(entrantsCount) {
    const roundNumbers = [];

    var nextPowOf2 = 1;
    while(nextPowOf2<entrantsCount){
        nextPowOf2=nextPowOf2*2;
    }


    var a;
    if(nextPowOf2===entrantsCount){
        a = entrantsCount;
    }
    else {
        var byes = nextPowOf2 - entrantsCount;
        a = entrantsCount-byes;
        roundNumbers.push(a);
        a = a/2 + byes;
    }


    while (a>=1) {
        roundNumbers.push(a);
        a = a/2;
    }
    return roundNumbers;
}
    
function generateBracketJS(bracket, entrants, roundNumbers){//BACKEND
    var nextPlayer = -1;

    //generate rounds
    for(let i = 0; i < roundNumbers.length; i++) {
        var round = new Round(i);

        //generate matches
        for(let j = 0; j < roundNumbers[i]; j+=2) {
            var match = new Match(j/2);
            var e1 = new Entrant();
            var e2 = new Entrant();

            //put entrants into their initial matches, remaining matches stay with the empty entrants 'new Entrant()'
            if(bracket.type!=LOSERS_BRACKET){
                if(i==0) {//first round
                    const p1Name = entrants[j];
                    const p2Name = entrants[j+1];
                    nextPlayer = j + 2;

                    e1.setName(p1Name);
                    e2.setName(p2Name);
                }

                if(i==1){//second round (necessary if there are byes involved)
                    //start adding entrants from where takenspots end
                    var takenSpots = roundNumbers[0]/2;
                    var a = takenSpots/2;
                    var jIndex = Math.floor(takenSpots/2);

                    if(j/2>=jIndex & nextPlayer<entrants.length){
                        if(!Number.isInteger(a)&j/2==jIndex){
                            //if one of the spots is reserved for an entrant from round 1, add one bye entrant
                            const p2Name = entrants[nextPlayer];
                            nextPlayer++;

                            e2.setName(p2Name);
                        }

                        else{
                            //if none of the spots are reserved for entrants from round 1, add both bye entrants
                            const p1Name = entrants[nextPlayer];
                            nextPlayer++;
                            const p2Name = entrants[nextPlayer];
                            nextPlayer++;

                            e1.setName(p1Name);
                            e2.setName(p2Name);
                        }
                    }
                }
            }
            
            match.appendEntrant(e1);
            //if not last round
            if(i!=roundNumbers.length-1){
                match.appendEntrant(e2);
            }

            //add match to round
            round.appendMatch(match);
        }

        //add round to bracket
        bracket.appendRound(round);
    }
}
