import React from 'react'
import RoundGUI from './RoundGUI'
import "../Bracket.css"

//Component for bracket information. Main purpose is to hold all the rounds in the bracket.
const BracketGUI = ({bracket, tournament, setTournament, isCreator}) => {
  return (
    <div id={bracket.type} className='bracket'>
      <div className='bracketHeader'>Bracket</div>

      {bracket.rounds.map((round, i) =>
        <RoundGUI key={i} brackettype={bracket.type} round={round} width={`${100/bracket.rounds.length}%`} tournament={tournament} setTournament={setTournament} isCreator={isCreator}/>
      )}
      
      <div className="clear"/>
    </div>
  )
}

export default BracketGUI
