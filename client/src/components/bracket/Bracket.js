import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/Axois';
import './Bracket.css';


//Constants & Classes
const BRACKET = 'bracket';
const WINNERS_BRACKET = 'bracketW';
const LOSERS_BRACKET = 'bracketL';



const TournamentBracket = (params) =>{

    const [viewBracket, setViewBracket] = useState(false);
//TODO: GET PARTICIPANTS


    const showBracket = ()=>{
        setViewBracket(true);
    }


    return(
        <div>
            {viewBracket ? ( 
                <div>
                    <div id="tournament-bracket-title">
                        <h1>Tournament Bracket(s)</h1>
                    </div>
                    <div class="tournament-bracket-popup">
                        <div class="tournament-bracket-popup-content">
                            <span class="tournament-bracket-closeBtn">&times;</span>
                            <h3 class="tournament-bracket-matchWinner">Select The Winner</h3>
                            <div class="tournament-bracket-eButtons">
                                <button class="tournament-bracket-eButton"></button>
                                <button class="tournament-bracket-eButton"></button>
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