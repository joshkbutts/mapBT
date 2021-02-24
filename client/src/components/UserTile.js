import React from 'react'
const UserTile = (props) => {
  
  return (
    <div className="user-tile text-center">

      <div className="grid-x">
        <div className="cell small-4">
          
          <div className="map-img">
            <img className="map-img" src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1078&q=80" />
          </div>
        </div>

        <div className="cell small-8 text-center user-name-home">
          <h6>
          {props.map.userName}'s Map
          </h6>
        </div>
      </div>
    </div>
  )
}

export default UserTile