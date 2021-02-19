import React from 'react'
import Icon from '@iconify/react'
import mapMarkerQuestion from '@iconify/icons-mdi/map-marker-question'

const QuestionMarker = (props) => {
  return (
    <div className="pin">
      <Icon icon={mapMarkerQuestion} className="pin-icon"  onClick={props.openModal}/>
      <button className='modal-button subheader'>Click marker again to add Location!</button>
    </div>
  )
}

export default QuestionMarker