import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import Map from './Map'
import { useParams } from 'react-router-dom'
import LocationPin from './LocationPin'

const MapShow = (props) => {
  const [erros, setErrors] = useState([])
  const [map, setMap] = useState({
    markers: []
  })

  const { id } = useParams()

  const getMap = async () => {
    try {
      const response = await fetch(`/api/v1/my-map/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const mapBody = await response.json()
      setMap(mapBody.map)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getMap()
  }, [])

  return (
    <div className="grid-x grid-margin-x main-container">
      <div className="cell small-9">
        <Map location={map.markers} />
      </div>
      <div className="cell small-3">
        <h1>users travels</h1>
      </div>
    </div>
  )
}

export default MapShow