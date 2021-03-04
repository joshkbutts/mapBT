import React, { useEffect, useState } from 'react'
import Map from './Map'
import { useParams } from 'react-router-dom'
import UserRecentTravelsList from './UserRecentTravelsList'
import NewTravelForm from './NewTravelForm'
import Modal from 'react-modal'
import MyMappClient from '../services/apiClient/MyMappClient'

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
    const body = await MyMappClient.getMap(id)
    setMap(body.map)
    setMarkers(body.markers)
  }

  const postTravel = async (newMarkerData) => {
    const body = await MyMappClient.postTravel(newMarkerData, id)
    setMarkers([
      ...markers, body.marker
    ])
    setSelectedArea({
      lat: '',
      lng: ''
    })
  }

  const deleteTravel = async (markerData) => {
    const body = await MyMappClient.deleteTravel(markerData)
    setMarkers(body.markers)
  }

  const editMarker = async (markerData, id) => {
    const body = await MyMappClient.editMarker(markerData, id)
    setMarkers(body.markers)
    setErrors([])
  }

  useEffect(() => {
    getMap()
    setSelectedArea({
      lat: '',
      lng: ''
    })
  }, [])

  let mapClick = mapClick = ({ lat, lng }) => {
    setSelectedArea({ lat: lat.toString(), lng: lng.toString() })
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
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
            mapClick={mapClick}
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