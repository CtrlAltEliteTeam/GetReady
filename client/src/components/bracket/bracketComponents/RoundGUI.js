import React from 'react'
import MatchGUI from './MatchGUI'

const RoundGUI = ({round, width}) => {
  return (
    <div className='round' brackettype='bracket' roundnum={round.roundNum} style={{width: width}}>
      {round.matches.map((match, i) =>
        <MatchGUI key={i} roundnum = {round.roundNum} match={match}/>
      )}
    </div>
  )
}

export default RoundGUI
