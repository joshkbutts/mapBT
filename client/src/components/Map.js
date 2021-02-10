import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'
import QuestionMarker from './QuestionMarker'

const Map = (props) => {

  const center = {
    center: {
      lat: 42.40,
      lng: -71.38
    }
  }

  const zoom = 7

  const markerData = props.location.map(location => {
    return (
      <LocationPin
        key={location.id}
        lat={location.lat}
        lng={location.lng}
        title={location.title}
        description={location.description}
      />
    )
  })

  let qMarker = <QuestionMarker
    lat={props.selectedArea.lat}
    lng={props.selectedArea.lng}
  />

  if (props.selectedArea.lat === null || props.selectedArea.lng === null) {
    qMarker = null
  }

  return (

    <div className="google-map">
      <GoogleMapReact
        
        defaultCenter={center.center}
        defaultZoom={zoom}
        onClick={props.onClick}
      >
        {markerData}
        {qMarker}
      </GoogleMapReact>
    </div>
  )
}

export default Map