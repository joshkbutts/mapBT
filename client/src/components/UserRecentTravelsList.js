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

  let travelCheck

  if (travelTileInfo.length === 0) {
    travelCheck = <h4 className='text-center subheader'>click the map to make your first post!</h4>
  } else {
    travelCheck = travelTileInfo.reverse()
  }

  return (
    <div>
      <nav>
        {travelCheck}
      </nav>
    </div>
  )
}

export default UserRecentTravelsList