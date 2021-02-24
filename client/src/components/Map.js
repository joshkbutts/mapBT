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

  const markerData = props.markers.map(marker => {
    return (
      <LocationPin
        key={marker.id}
        lat={marker.lat}
        lng={marker.lng}
        title={marker.title}
        description={marker.description}
        image={marker.image}
      />
    )
  })

  let qMarker = <QuestionMarker
    lat={props.selectedArea.lat}
    lng={props.selectedArea.lng}
    text='Add this location?'
    openModal={props.openModal}
  />

  if (props.selectedArea.lat === null || props.selectedArea.lng === null) {
    qMarker = undefined
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