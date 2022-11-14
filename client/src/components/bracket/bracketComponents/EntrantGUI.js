import React from 'react'

const EntrantGUI = ({entrant,key}) => {
  return (
    <input type='text' className='entrant' readOnly='readOnly' value={entrant.getName()}/>
  )
}

export default EntrantGUI
