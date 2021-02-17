import React, { useState } from 'react'
import UserRecentTravelEditForm from './UserRecentTravelEditForm'
import Modal from 'react-modal'

const UserRecentTravelTile = (props) => {

  

 
 

  const handleDelete = () => {
    props.deleteTravel(props.marker.id)
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
    <div className="user-recent-travel-tile text-center">
      <h6>
        {props.marker.title}
      </h6>
      <img className='show-page-img' src={props.marker.image} />
      <h6>
        {props.marker.description}
      </h6>
      <hr></hr>
      <div className='grid-x'>
        <div className='cell small-6'>
          <h6 className='edit-button' onClick={openModal}> edit </h6>
        </div>
        <div className='cell small-6'>
          <h6 className='delete-button' onClick={handleDelete}> delete </h6>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={customStyles}
      >
        <UserRecentTravelEditForm
          id={props.marker.id}
          editMarker={props.editMarker}
        />
      </Modal>
    </div>
  )
}

export default UserRecentTravelTile