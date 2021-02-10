import React from 'react'

const UserRecentTravelTile = (props) => {
  return (
    <div className="user-recent-travel-tile text-center">
      <h6>
        {props.tileText.title}
      </h6>
      <hr></hr>
      <h7>
        {props.tileText.description}
      </h7>
    </div>
  )
}

export default UserRecentTravelTile