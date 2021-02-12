import React, { useEffect, useState } from 'react'
import Map from './Map'
import { useParams } from 'react-router-dom'
import UserRecentTravelsList from './UserRecentTravelsList'
import NewTravelForm from './NewTravelForm'
import translateServerErrors from '../services/translateServerErrors'

const MapShow = (props) => {
  const { id } = useParams()
  const [errors, setErrors] = useState([])
  const [map, setMap] = useState({})
  const [markers, setMarkers] = useState([])
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
      setMarkers(mapBody.markers)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const postTravel = async (newMarkerData) => {
    let allData = { ...newMarkerData, ...selectedArea }
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
        setMarkers([
          ...markers, body.marker
        ])
        setSelectedArea({
          lat: '',
          lng: ''
        })
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const deleteTravel = async ( markerData ) => {
    try {
      const response = await fetch(`/api/v1/markers/${markerData}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
      })
      if (!response.ok) { 
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const body = await response.json()
      setMarkers(body.markers)
    } catch (error) {  
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const editMarker = async (markerData, id) => {
    try {
      const response = await fetch(`/api/v1/markers/${id}`, {
        method: 'PATCH',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(markerData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = response.json()
          const newErrors = translateServerErrors(body.errors)
          setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw (error)
        }
      } else {
        const body = await response.json()
        setMarkers(body.markers)
        setErrors([])
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
            location={markers}
            onClick={onClick}
            selectedArea={selectedArea}
          />
        </div>
        <div className="cell small-3">
          <UserRecentTravelsList
            markerText={markers}
            user={map.email}
            deleteTravel={deleteTravel}
            editMarker={editMarker}
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