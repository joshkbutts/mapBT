import React from 'react'
import UserList from './UserList'
import RecentTravelsList from './RecentTravelsList'

const HomePage = (props) => {
  return (
    <div className="grid-x grid-margin-x main-container">
      <div className="cell small-5">
        <UserList />
      </div>

      <div className="cell small-7">
        <RecentTravelsList />
      </div>
    </div>
  )
}

export default HomePage