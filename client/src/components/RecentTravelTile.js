import React from 'react'

const RecentTravelTile = (props) => {
  return(
    <div className="user-tile text-center">
      <h6>
      {props.user} visited {props.title}
      </h6>
      <p>
        {props.description}
      </p>
    </div>
  )
}

export default RecentTravelTile