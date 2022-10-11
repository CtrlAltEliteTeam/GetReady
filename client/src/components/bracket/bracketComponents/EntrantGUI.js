import React from 'react'

const EntrantGUI = ({entrant}) => {
  return (
    <input type='text' className='entrant' readOnly='readOnly' value={entrant.getName()}/>
  )
}

export default EntrantGUI
