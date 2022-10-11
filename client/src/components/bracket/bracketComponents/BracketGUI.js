import React from 'react'
import RoundGUI from './RoundGUI'

const BracketGUI = ({bracket}) => {
  return (
    <div id={`${bracket.type}`} className='bracket'>
      <h3 className='bracketHeader'>Bracket</h3>

      {bracket.rounds.map((round, i) =>
        <RoundGUI key={i} round={round} width={`${100/bracket.rounds.length}%`}/>
      )}
      
      <div className="clear"/>
    </div>
  )
}

export default BracketGUI
