import React, { useState, useEffect, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from '../../api/Axois';
import './Bracket.css';


const BRACKET = 'bracket';
const WINNERS_BRACKET = 'bracketW';
const LOSERS_BRACKET = 'bracketL';

class Bracket{
    constructor(type) {
        this.type=type;
        this.rounds = [];
    }

    appendRound(round){
        this.rounds.push(round);
    }
}

class Round{
    constructor(roundNum) {
        this.roundNum = roundNum;
        this.matches = [];
    }

    appendMatch(match){
        this.matches.push(match);
    }
}

class Match {
    constructor(matchNum) {
        this.matchNum = matchNum;
        this.entrants = [];
        this.winner = null;
        this.loser = null;
    }

    appendEntrant(entrant){
        this.entrants.push(entrant);
    }
}

class Entrant {
    constructor() {
        this.name = "";
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }
}


const TournamentBracket = (props) =>{

  

    const [viewBracket, setViewBracket] = useState(false);


    const showBracket = (e)=>{
        if(viewBracket){
            setViewBracket(false);
        }
        if(!viewBracket){
            setViewBracket(true);
            const entrants = ['1', '2', '3', '4', '5', '6', '7', '8'];
            generateTournament(entrants);
        }
        
    }
    //Global Variables

//Javascript representation of tournament, just a list of brackets. Contains one element in single elimination, and two in double elimination.
//In double elimination, the first element is winners bracket and second element is losers bracket.
var tournament = [];
//GUI representation of tournament
var tournamentGUI = document.createElement("div");
tournamentGUI.setAttribute("id","tournament");
const title = document.createElement('h1');
title.innerHTML="Tournament Bracket(s)";
tournamentGUI.appendChild(title);
document.body.appendChild(tournamentGUI);


//current state of match decider popup (popup is used to determine the outcome of the match that was just clicked)
var currBracketIndex = -1;
var currRound = -1;
var currMatch = -1;

const outcomeGUI = document.querySelector(".popup");
//button to close popup
// const clBtn = document.querySelector('.closeBtn');
// clBtn.addEventListener('click', e=>{
//     outcomeGUI.style.display="none"; //if button is clicked, close popup
// });

//buttons that represent each entrant, the button that's pressed determines the winner of the match
//eBtns[0] is entrant 1 and eBtns[1] is entrant 2
// var eBtns = document.querySelectorAll('.eButton');
// eBtns[0].addEventListener('click', e=>{
//     eBtns = document.querySelectorAll('.eButton');                               //get buttons again
//     advance(currBracketIndex, currRound, currMatch, eBtns[0].innerText, eBtns[1].innerText);         //use results of match to update the tournament
//     outcomeGUI.style.display="none";                                             //close popup
// });
// eBtns[1].addEventListener('click', e=>{
//     eBtns = document.querySelectorAll('.eButton');
//     advance(currBracketIndex, currRound, currMatch, eBtns[1].innerText, eBtns[0].innerText);
//     outcomeGUI.style.display="none";
// });


//Main Functions
function generateTournament(entrants){
    singleElim(entrants);   
}

function singleElim(entrants){
    //BACKEND
    //should only occur once, when seeding is over
    var bracket = new Bracket(BRACKET);
    //gets the number of entrants in each round according to how many entrants there are in total, getRoundNumbersW and getRoundNumbersL do the same but for the winners and losers brackets respectively
    //e.g. if there are 4 entrants, returns [4, 2, 1]
    const roundNumbers = getRoundRumbers(entrants.length);
    generateBracketJS(bracket, entrants, roundNumbers);
    tournament.push(bracket);



    //FRONTEND
    //should occur whenever user opens the tournament on the client-side
    const bracketGUI = document.createElement('div');
    //set html properties of gui bracket
    bracketGUI.setAttribute("id", `${BRACKET}`);
    bracketGUI.setAttribute("className", "bracket");
    const bracketHeader = document.createElement('h3');
    bracketHeader.innerText = "Bracket";
    bracketHeader.setAttribute("className", "bracketheader");
    bracketGUI.appendChild(bracketHeader);

    //initializes the GUI representations of the bracket
    generateBracketGUI(bracket, bracketGUI);

    //add bracket to tournament
    tournamentGUI.appendChild(bracketGUI);
    document.body.appendChild(tournamentGUI);
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
                    var jIndex = Math.floor(takenSpots/2); 
    
                    if(j>=jIndex & nextPlayer<entrants.length){
                        if(j>jIndex & nextPlayer+1<entrants.length){
                            //if none of the spots are reserved for entrants from round 1, add both bye entrants
                            const p1Name = entrants[nextPlayer];
                            nextPlayer++;
                            const p2Name = entrants[nextPlayer];
                            nextPlayer++;
    
                            e1.setName(p1Name);
                            e2.setName(p2Name);
                        }
    
                        else{
                            //if one of the spots is reserved for an entrant from round 1, add one bye entrant
                            const p2Name = entrants[nextPlayer];
                            nextPlayer++;
    
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


function generateBracketGUI(bracket, bracketGUI){//FRONTEND
    //generate rounds
    for(let i = 0; i < bracket.rounds.length; i++) {
        const roundGUI = document.createElement('div');
        roundGUI.setAttribute("className", "round");
        roundGUI.setAttribute("bracketType", `${bracket.type}`);
        roundGUI.setAttribute("roundNum", `${i}`);
        roundGUI.style.width=`${100/bracket.rounds.length}%`;

        //generate matches
        for(let j = 0; j < bracket.rounds[i].matches.length; j++) {
            const matchGUI = document.createElement('div');
            matchGUI.setAttribute("className", "match");
            matchGUI.setAttribute("bracketType", `${bracket.type}`);
            matchGUI.setAttribute("roundNum", `${i}`);
            matchGUI.setAttribute("matchNum", `${j}`);
            //match.style.height=`${100/bracket.rounds[i].matches.length}%`;


            var entrants = bracket.rounds[i].matches[j].entrants;
            for (let k = 0; k < entrants.length; k++){
                const eGUI = document.createElement('input');
                eGUI.setAttribute("type", "text");
                eGUI.setAttribute("className", "entrant");
                eGUI.setAttribute("readonly", "readonly");

                eGUI.setAttribute("value", entrants[k].getName());
                matchGUI.appendChild(eGUI);
               // document.body.appendChild(matchGUI);
            }


            //if not last round
            if(i!=bracket.rounds.length-1){

                //bring popup onto screen if match is clicked
                matchGUI.addEventListener('click', e=>{
                    //get info about the match
                    var bracketType = matchGUI.getAttribute("bracketType");
                    //change the current state of the popup
                    currRound = parseInt(matchGUI.getAttribute("roundNum"));
                    currMatch = parseInt(matchGUI.getAttribute("matchNum"));
                    currBracketIndex = findIndex(bracketType);
                    

                    // if(currBracketIndex!=-1){
                    //     //get entrants playing the current match
                    //     var entrants = tournament[currBracketIndex].rounds[currRound].matches[currMatch].entrants;

                    //     //set the button text to the entrants' names
                    //     // eBtns[0].innerText = entrants[0].getName();
                    //     // eBtns[1].innerText = entrants[1].getName();

                    //     //if entrant1 is present    &  entrant2 is present     &  //the current round isn't over 
                    //     if(eBtns[0].innerText != "" & eBtns[1].innerText != "" & !roundDone(currBracketIndex, currRound)){
                    //         //bring the match decider popup onto the screen
                    //         outcomeGUI.style.display = 'block';
                    //     }
                    // }           
                });
            }

            //add match to round
            roundGUI.appendChild(matchGUI);
            //document.body.appendChild(roundGUI);
        }

        //add round to bracket
        bracketGUI.appendChild(roundGUI);

    }

    //undo float
    const clr = document.createElement('div');
    clr.setAttribute("className", "clear");
    bracketGUI.appendChild(clr);
    document.body.appendChild(bracketGUI);
}




//Helper Functions
function findIndex(bracketType){//FRONTEND
    //loop through tournament to find index of tournament with given brackettype
    for(let f = 0; f < tournament.length; f++){
        if(tournament[f].type==bracketType){
            return f;
        }
    }    

    return -1;
}


function getRoundRumbers(entrantsCount) {//BACKEND
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


function roundDone(bIndex, roundNum){//FRONTEND
    //checks if round is done by looping through all the matches and checking if all of them have winners
    var round = tournament[bIndex].rounds[roundNum];
    var matches = round.matches;

    for(let i = 0; i < matches.length; i++){
        var match = matches[i];

        if(match.winner==null){
            return false;
        } 
    }
    
    return true;
}

//use current match information (bracketNumber, roundNumber, matchNumber, winner & loser) to get new state of the tournament
function advance(b, r, m, winnerName, loserName){//BACKEND then UI needs to be updated on FRONTEND (updateTournamentGUI())
    var type = tournament[b].type;

    var index = 1;
    if(m%2==0){
        index = 0;
    }

    var currMatchEntrants = tournament[b].rounds[r].matches[m].entrants;
        for(let i = 0; i < currMatchEntrants.length; i++){
            var currEntrant = currMatchEntrants[i];

            if(type==BRACKET){//single elim bracket
                if(currEntrant.getName()==winnerName){
                    tournament[0].rounds[r].matches[m].winner = currEntrant;

                    //determine position in next match
                    tournament[0].rounds[r+1].matches[Math.floor(m/2)].entrants[index] = currEntrant;
                }
    
                if(currEntrant.getName()==loserName){
                    tournament[0].rounds[r].matches[m].loser = currEntrant;
                }
            }



            //Extra Cases to Handle
            //if last match in bracket (2nd last round), set winner of last round (the match with just one player)
            if(r == tournament[b].rounds.length-2 && currEntrant.getName()==winnerName){
                tournament[b].rounds[r+1].matches[0].winner = currEntrant;
            }
        }  

    //var serializedTournament = JSON.parse(JSON.stringify(tournament));
    //var deserializedTournament = deserializeTournament(serializedTournament);
    //console.log(deserializedTournament);

    //update the GUI to represent the new state of the tournament
    updateTournamentGUI();
}

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


function updateTournamentGUI(){//FRONTEND
    for(let i = 0; i < tournament.length; i++){
        var bracket = tournament[i];
        const bracketGUI = document.getElementById(`${bracket.type}`);
        const rounds = bracketGUI.getElementsByClassName("round");

        //each round
        for(let i = 0; i < rounds.length; i++){
            var round = rounds[i];
            const matches = round.getElementsByClassName("match");

            //each match
            for(let j = 0; j < matches.length; j++){
                var match = matches[j];
                const entrants = match.getElementsByClassName("entrant");

                //each entrant
                for(let k = 0; k < entrants.length; k++){
                    entrants[k].value = bracket.rounds[i].matches[j].entrants[k].getName();
                }
            }
        }
    }
     
}



    return(
        <div>
            {viewBracket ? (  
            <div>
            <div id="tournament-parent">
                <div className="tournament-bracket-closeBtn" onClick={showBracket}>&times;</div>
                 <div id="tournament">
                    <h1>Tournament Bracket(s)</h1>
                </div> 
                <div className="popup">
                    <div className="popup-content">
                        <span className="closeBtn">&times;</span>
                        <h3 className="matchWinner">Select The Winner</h3>
                        <div className="eButtons">
                            <button className="eButton"></button>
                            <button className="eButton"></button>
                        </div>
                    </div>
                </div>
            </div>
            
                
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