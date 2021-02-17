import React from 'react'
import UserRecentTravelTile from './UserRecentTravelTile'

const UserRecentTravelsList = (props) => {

  const travelTileInfo = props.markers.map(marker => {
    return (
      <UserRecentTravelTile
        key={marker.id}
        marker={marker}
        deleteTravel={props.deleteTravel}
        editMarker={props.editMarker}
      />
    )
  })

  return (
    <div>
      <nav>
        {travelTileInfo.reverse()}
      </nav>
    </div>
  )
}

export default UserRecentTravelsList