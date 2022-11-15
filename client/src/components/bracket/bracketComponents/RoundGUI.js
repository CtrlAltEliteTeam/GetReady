import React from 'react'
import MatchGUI from './MatchGUI'

//Component for round information. Main purpose is to hold all the matches in the round.
const RoundGUI = ({brackettype, round, width, tournament, setTournament, isCreator}) => {
  return (
    <div className='round' brackettype={brackettype} roundnum={round.roundNum} style={{width: width}}>
    <div className='roundnumber'>Round Number: {round.roundNum}</div>
      {round.matches.map((match, i) =>
        <MatchGUI key={i} brackettype={brackettype} r={round.roundNum} match={match} tournament={tournament} setTournament={setTournament} isCreator={isCreator}/>
      )}
    </div>
  )
}

export default RoundGUI
