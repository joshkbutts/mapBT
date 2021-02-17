import React, { useEffect, useState } from 'react'
import Map from './Map'
import { useParams } from 'react-router-dom'
import UserRecentTravelsList from './UserRecentTravelsList'
import NewTravelForm from './NewTravelForm'
import translateServerErrors from '../services/translateServerErrors'
import Modal from 'react-modal'

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
    try {
      const response = await fetch(`/api/v1/my-map/${id}/markers`, {
        method: "POST",
        headers: new Headers({
          "Accept": "image/jpeg"
        }),
        body: newMarkerData
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

  const deleteTravel = async (markerData) => {
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
    setSelectedArea({
      lat: '',
      lng: ''
    })
  }, [])

  const onClick = ({ lat, lng }) => {
    setSelectedArea({ lat: lat.toString(), lng: lng.toString() })
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed. 
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

  return (
    <div className="main-container">

      <div className='grid-x'>
        <div className='cell small-9'>
          <h3 className="subheader">
            {map.userName}'s Map
          </h3>
        </div>

        <div className='cell small-3'>
          <h3 className="subheader">
            recent travels
          </h3>
        </div>

      </div>


      <div className="grid-x grid-margin-x">

        <div className="cell small-9">
          <Map
            markers={markers}
            onClick={onClick}
            selectedArea={selectedArea}
            openModal={openModal}
          />
        </div>

        <div className="cell small-3">
          <UserRecentTravelsList
            markers={markers}
            user={map.userName}
            deleteTravel={deleteTravel}
            editMarker={editMarker}
          />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
      >
        <NewTravelForm
          postTravel={postTravel}
          selectedArea={selectedArea}
        />
      </Modal>
    </div>
  )
}

export default MapShow