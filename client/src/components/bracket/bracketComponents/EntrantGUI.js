import React from 'react'

//Component for holding the name of an entrant in a match
const EntrantGUI = ({entrant,key}) => {
  return (
    <input type='text' className='entrant' readOnly='readOnly' value={entrant.getName()}/>
  )
}

export default EntrantGUI
