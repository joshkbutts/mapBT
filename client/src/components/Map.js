import React from 'react'
import GoogleMapReact from 'google-map-react'
import LocationPin from './LocationPin'

const Map = ({ location, defaultZoom }) => {

  const center = {
    center: {
      lat: 42.40,
      lng: -71.38
    }
  }

  const zoom = 7

  const markerData = location.map(location => {
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

  return (
    
      <div className="google-map">
        <GoogleMapReact
          
          defaultCenter={center.center}
          defaultZoom={zoom}
        >
          {markerData}
        </GoogleMapReact>
      </div>
  )
}

export default Map