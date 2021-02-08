import React from 'react'
import { Link } from 'react-router-dom'
const UserTile = (props) => {
  
  return (
    <div className="user-tile">

      <div className="grid-x">
        <div className="cell small-6">
          <h5>
            {props.map.email}'s Map
          </h5>
          <div className="map-img">
            <img className="map-img" src="https://allfreedesigns.com/wp-content/uploads/2014/08/vector-world-map-3.jpg" />
          </div>
        </div>

        <div className="cell small-6 user-travel-button">
          <h6>
            <Link to={`/my-map/${props.map.id}`}>
            View {props.map.email}'s Travels
            </Link>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default UserTile