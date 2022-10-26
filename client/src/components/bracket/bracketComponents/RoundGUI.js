import React from 'react'
import MatchGUI from './MatchGUI'

const RoundGUI = ({brackettype, round, width, tournament, setTournament, isCreator}) => {
  return (
    <div className='round' brackettype={brackettype} roundnum={round.roundNum} style={{width: width}}>
      {round.matches.map((match, i) =>
        <MatchGUI key={i} brackettype={brackettype} r={round.roundNum} match={match} tournament={tournament} setTournament={setTournament} isCreator={isCreator}/>
      )}
    </div>
  )
}

export default RoundGUI
