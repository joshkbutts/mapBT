import React, { useState } from 'react'
import UserRecentTravelEditForm from './UserRecentTravelEditForm'

const UserRecentTravelTile = (props) => {

  const [isEditing, setIsEditing] = useState(false)

  let editForm

  if (isEditing) {
    editForm = <div><UserRecentTravelEditForm id={props.tileText.id} editMarker={props.editMarker} /></div>
  }
  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    props.deleteTravel(props.tileText.id)
  }

  return (
    <div className="user-recent-travel-tile text-center">
      <h6>
        {props.tileText.title}
      </h6>
      <hr></hr>
      <h6>
        {props.tileText.description}
      </h6>
      <div className='grid-x'>
        <div className='cell small-6'>
          <h6 onClick={handleEdit}> edit </h6>
        </div>
        <div className='cell small-6'>
          <h6 onClick={handleDelete}> delete </h6>
        </div>
      </div>
      {editForm}
    </div>
  )
}

export default UserRecentTravelTile