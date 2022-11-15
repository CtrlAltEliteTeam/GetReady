import React, { useState } from 'react'
import EntrantGUI from './EntrantGUI'
import DeciderPopup from './DeciderPopup';

//Component for match information. Match will contain EntrantGUI components for each entrant in the match.
//Whenever it's clicked, DeciderPopup is brought onto the screen
const MatchGUI = ({brackettype, r, match, tournament, setTournament, isCreator}) => {
  //find at which position the current bracket is located in the tournament list
  var b = findIndex(tournament, brackettype);

  //get names of entrants in match
  var entrants = match.entrants;
  var e1name = entrants[0].getName();
  var e2name = "";
  if(entrants.length==2){
    e2name = entrants[1].getName();
  }

  //stateful variable to store whether the DeciderPopup should be visible or not
  const [visible, setVisible]= useState(false);

  //function to handle when a match is clicked (just sets the visible variable to true so the DeciderPopup can be seen)
  const handleMatch = event => {
    if(entrants.length == 2){
      if(entrants[0].getName()!="" && entrants[1].getName()!="" && !roundDone(tournament, b, r) && isCreator){
        setVisible(true);
      }
    } 
  };

  
  return (
    <div>
      <div className='match' brackettype={brackettype} roundnum={r} matchnum={match.matchNum} onClick={handleMatch}>
        <div className='matchnumber'>Match Number:{match.matchNum}</div>
        {match.entrants.map((entrant, i) =>
          <EntrantGUI key={i} entrant={entrant}/>
        )}
      </div>
      <DeciderPopup tournament={tournament} setTournament={setTournament} b={b} r={r} m={match.matchNum} e1name={e1name} e2name={e2name} visible={visible} setVisible={setVisible}/>
    </div>
  )
}

export default MatchGUI




//loop through tournament to find index of tournament with given brackettype
function findIndex(tournament, bracketType){
  for(let f = 0; f < tournament.length; f++){
      if(tournament[f].type==bracketType){
          return f;
      }
  }    

  return -1;
}

//checks if round is done by looping through all the matches and checking if all of them have winners
function roundDone(tournament, b, r){
  var round = tournament[b].rounds[r];
  var matches = round.matches;

  for(let i = 0; i < matches.length; i++){
      var match = matches[i];

      if(match.winner==null){
          return false;
      } 
  }
  
  return true;
}
