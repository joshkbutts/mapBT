import React, { useState } from 'react'
import UserRecentTravelEditForm from './UserRecentTravelEditForm'

const UserRecentTravelTile = (props) => {
  
  const [isEditing, setIsEditing] = useState(false)

  let editForm

  if (isEditing) {
    editForm = <div><UserRecentTravelEditForm id={props.marker.id} editMarker={props.editMarker} /></div>
  }
  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    props.deleteTravel(props.marker.id)
  }

  return (
    <div className="user-recent-travel-tile text-center">
      <h6>
        {props.marker.title}
      </h6>
      <hr></hr>
      <h6>
        {props.marker.description}
      </h6>
      <img className='show-page-img' src={props.marker.image}/>
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