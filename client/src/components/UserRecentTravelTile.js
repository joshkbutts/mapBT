import React, { useState } from 'react'
import Modal from 'react-modal'
import UserRecentTravelShow from './UserRecentTravelShow'

const UserRecentTravelTile = (props) => {
  const [showModalIsOpen, setShowIsOpen] = useState(false)

  function openShowModal() {
    setShowIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed. 
  }

  function closeShowModal() {
    setShowIsOpen(false)
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
    <div className="user-recent-travel-tile text-center">
      <div onClick={openShowModal}>
        <h6>
          {props.marker.title}
        </h6>
        <img className='show-page-img' src={props.marker.image} />
        <h6>
          {props.marker.description}
        </h6>
      </div>
      <Modal
        isOpen={showModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeShowModal}
        ariaHideApp={false}
        style={customStyles}
      >
        <UserRecentTravelShow 
        marker={props.marker}
        deleteTravel={props.deleteTravel}
        editMarker={props.editMarker}
        />
      </Modal>
    </div>
  )
}

export default UserRecentTravelTile