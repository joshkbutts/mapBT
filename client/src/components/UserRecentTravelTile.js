import React from 'react'

const UserRecentTravelTile = (props) => {
  return (
    <div className="user-recent-travel-tile">
      <h6>
        {props.tileText.title}
      </h6>
      <h7>
        {props.tileText.description}
      </h7>
    </div>
  )
}

export default UserRecentTravelTile