import React, {useState} from 'react'
import {BRACKET, WINNERS_BRACKET, LOSERS_BRACKET} from '../Classes_Constants'

const DeciderPopup = ({tournament, setTournament, b, r, m, e1name, e2name, visible, setVisible}) => {
    const close = event => {
        setVisible(false);
    };
    const handleE1 = event => {
        advance([...tournament], setTournament, b, r, m, e1name, e2name);
        setVisible(false);
    };
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
                            <button className="eButton" onClick={handleE1}>{e1name}</button>
                            <button className="eButton" onClick={handleE2}>{e2name}</button>
                        </div>
                </div>
        </div>
    )
}

export default DeciderPopup




function advance(tournament, setTournament, b, r, m, winnerName, loserName){
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
            tournament[b].winner = currEntrant;
        }
    }


    //update tournament
    setTournament((tournament.map(item=>{
        return {...item};
    })));
}
