import React, {useState} from 'react'
import {BRACKET, WINNERS_BRACKET, LOSERS_BRACKET} from '../Classes_Constants'


//Component for selecting the winner of the match. Each button represents an entrant and the one that is clicked is the winner.
const DeciderPopup = ({tournament, setTournament, b, r, m, e1name, e2name, visible, setVisible}) => {
    //function for closing the window
    const close = event => {
        setVisible(false);
    };
    //function to handle entrant 1 winning the match
    const handleE1 = event => {
        advance([...tournament], setTournament, b, r, m, e1name, e2name);
        setVisible(false);
    };
    //function to handle entrant 2 winning the match
    const handleE2 = event => {
        advance([...tournament], setTournament, b, r, m, e2name, e1name);
        setVisible(false);
    };

    return (
        <div className="popup" style={{display: visible ? 'block': 'none'}}>
                <div className="popup-content">
                        <span className="closeBtn" onClick={close}>&times;</span>
                        <h3 className="matchWinner">Select The Winner</h3>
                        <div className="eButtons">
                            <div className="eButton" onClick={handleE1}>{e1name}</div>
                            <div className="eButton" onClick={handleE2}>{e2name}</div>
                        </div>
                </div>
        </div>
    )
}

export default DeciderPopup



//set winner and loser of current match and move the players to their new positions in the bracket
function advance(tournament, setTournament, b, r, m, winnerName, loserName){
    var type = tournament[b].type;

    //index used to determine which slot (entrant1 or entrant2) the winner goes to in their next match
    var index = 1;
    if(m%2==0){
        index = 0;
    }

    var currMatchEntrants = tournament[b].rounds[r].matches[m].entrants;
    for(let i = 0; i < currMatchEntrants.length; i++){
        var currEntrant = currMatchEntrants[i];

        //single elim bracket
        if(type==BRACKET){
            if(currEntrant.getName()==winnerName){
                tournament[0].rounds[r].matches[m].winner = currEntrant;

                //determine winner's position in next match
                tournament[0].rounds[r+1].matches[Math.floor(m/2)].entrants[index] = currEntrant;
            }

            if(currEntrant.getName()==loserName){
                //set the loser of the match as this entrant and don't move them anywhere
                tournament[0].rounds[r].matches[m].loser = currEntrant;
            }
        }



        //Extra Cases to Handle
        //if last match in bracket (2nd last round), set winner of last round (the match with just one player) and winner of bracket
        if(r == tournament[b].rounds.length-2 && currEntrant.getName()==winnerName){
            tournament[b].rounds[r+1].matches[0].winner = currEntrant;
            tournament[b].winner = currEntrant;
        }
    }


    //update tournament statefully
    setTournament((tournament.map(item=>{
        return {...item};
    })));
}
