import React from 'react'
import { Link } from 'react-router-dom'
const UserTile = (props) => {
  
  return (
    <div className="user-tile text-center">

      <div className="grid-x">
        <div className="cell small-4 subheader">
          
          <div className="map-img">
            <img className="map-img" src="https://allfreedesigns.com/wp-content/uploads/2014/08/vector-world-map-3.jpg" />
          </div>
        </div>

        <div className="cell small-8 text-center">
          <h6>
          {props.map.email}'s Map
          </h6>
        </div>
      </div>
    </div>
  )
}

export default UserTile