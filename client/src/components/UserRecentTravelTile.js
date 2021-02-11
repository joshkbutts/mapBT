import React from 'react'

const UserRecentTravelTile = (props) => {
  
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
          <h6> edit </h6>
        </div>
        <div className='cell small-6'>
          <h6 onClick={handleDelete}> delete </h6>
        </div>
      </div>
    </div>
  )
}

export default UserRecentTravelTile