import React from 'react'

const RecentTravelTile = (props) => {
  return (
    <div className="user-tile text-center grid-x">
      <div className='cell small-3'>
        <img className='main-page-img' src={props.image} />
      </div>
      <div className='cell small-9'>
        <h6>
          {props.user} visited...
        </h6>
        <h6>
          {props.title}
        </h6>
      </div>

    </div>
  )
}

export default RecentTravelTile