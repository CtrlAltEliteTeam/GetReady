import React from 'react'
import EntrantGUI from './EntrantGUI'

const MatchGUI = ({roundnum, match}) => {
  return (
    <div className='match' brackettype='bracket' roundnum={roundnum} matchnum={match.matchNum}>
      {match.entrants.map((entrant, i) =>
        <EntrantGUI key={i} entrant={entrant}/>
      )}
    </div>
  )
}

export default MatchGUI
