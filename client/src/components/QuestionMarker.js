import React from 'react'
import Icon from '@iconify/react'
import mapMarkerQuestion from '@iconify/icons-mdi/map-marker-question'

const QuestionMarker = (props) => {
  return (
    <div className="pin">
      <Icon icon={mapMarkerQuestion} className="pin-icon" />
      <button className='modal-button subheader' onClick={props.openModal}>Click to add this Location!</button>
    </div>
  )
}

export default QuestionMarker