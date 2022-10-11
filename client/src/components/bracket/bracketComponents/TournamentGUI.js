import React from 'react'
import BracketGUI from './BracketGUI'

const TournamentGUI = ({tournament}) => {
  return (
    <div id='tournament'>
      {tournament.map((bracket, i) =>
        <BracketGUI key={i} bracket={bracket}/>
      )}
    </div>
  )
}

export default TournamentGUI
