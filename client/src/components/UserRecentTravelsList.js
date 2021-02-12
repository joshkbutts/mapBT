import React from 'react'
import UserRecentTravelTile from './UserRecentTravelTile'

const UserRecentTravelsList = (props) => {

  const travelTileInfo = props.markerText.map(tileText => {
    return (
      <UserRecentTravelTile
        key={tileText.id}
        tileText={tileText}
        deleteTravel={props.deleteTravel}
        editMarker={props.editMarker}
      />
    )
  })

  return (
    <div>
      <h4 className="subheader">
        {props.user}'s recent travels
      </h4>
      {travelTileInfo}
    </div>
  )
}

export default UserRecentTravelsList