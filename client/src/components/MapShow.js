import React, { useEffect, useState } from 'react'
import Map from './Map'
import { useParams } from 'react-router-dom'
import UserRecentTravelsList from './UserRecentTravelsList'
import NewTravelForm from './NewTravelForm'
import QuestionMarker from './QuestionMarker'
import translateServerErrors from '../services/translateServerErrors'

const MapShow = (props) => {
  const { id } = useParams()
  const [erros, setErrors] = useState([])
  const [map, setMap] = useState({
    markers: []
  })
  const [selectedArea, setSelectedArea] = useState({
    lat: '',
    lng: ''
  })

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

  const postTravel = async (newMarkerData) => {
    let allData = {...newMarkerData, ...selectedArea}
    try {
      const response = await fetch(`/api/v1/my-map/${id}/markers`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(allData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        const body = await response.json()
        setMap({
          ...map,
          markers: [...map.markers, body.marker]
        })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getMap()
  }, [])

  const onClick = ({ lat, lng }) => {
    setSelectedArea({ lat: lat.toString(), lng: lng.toString() })
  }

  return (
    <div className="main-container">
      <div className="grid-x grid-margin-x">
        <div className="cell small-9">
          <Map
            location={map.markers}
            onClick={onClick}
            selectedArea={selectedArea}
          />
        </div>
        <div className="cell small-3">
          <UserRecentTravelsList
            markerText={map.markers}
            user={map.email}
          />
        </div>
      </div>
      <NewTravelForm
        postTravel={postTravel}
        selectedArea={selectedArea}
      />
    </div>
  )
}

export default MapShow