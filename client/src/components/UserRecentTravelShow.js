import React, { useState } from 'react'
import Modal from 'react-modal'
import UserRecentTravelEditForm from './UserRecentTravelEditForm'
import CommentForm from './CommentForm'

const UserRecentTravelShow = (props) => {
  const [editModalIsOpen, setEditIsOpen] = useState(false);

  function openEditModal() {
    setEditIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed. 
  }

  function closeEditModal() {
    setEditIsOpen(false);
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

  const handleDelete = () => {
    props.deleteTravel(props.marker.id)
  }

  return (
    <div className='travel-show-tile'>
      <div className='grid-x travel-show-top'>
        <div className='cell small-4'>
          <img className='travel-show-img' src={props.marker.image}></img>
        </div>
        <div className='cell small-8'>
          <h3 className='subheader text-center'>
            {props.marker.title}
          </h3>
          <h4 className='subheader text-center'>
            {props.marker.description}
          </h4>
          <div className='grid-x'>
            <div className='cell small-6'>
              <h6 className='edit-button' onClick={openEditModal}> edit </h6>
            </div>
            <div className='cell small-6'>
              <h6 className='delete-button' onClick={handleDelete}> delete </h6>
            </div>
          </div>
        </div>
        <Modal
          isOpen={editModalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeEditModal}
          ariaHideApp={false}
          style={customStyles}
        >
          <UserRecentTravelEditForm
            id={props.marker.id}
            editMarker={props.editMarker}
          />
        </Modal>
      </div>

      <hr></hr>
      <CommentForm />

    </div>
  )
}

export default UserRecentTravelShow