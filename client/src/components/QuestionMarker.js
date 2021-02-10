import React from 'react'
import Icon from '@iconify/react'
import mapMarkerQuestion from '@iconify/icons-mdi/map-marker-question'

const QuestionMarker = ({ text }) => {
  return (
    <div className="pin">
      <Icon icon={mapMarkerQuestion} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )
}

export default QuestionMarker