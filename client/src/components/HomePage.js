import React from 'react'
import UserList from './UserList'
import RecentTravelsList from './RecentTravelsList'

const HomePage = (props) => {
  return (
    <div className="grid-x grid-margin-x main-container">
      <div className="cell small-6">
        <UserList />
      </div>

      <div className="cell small-6 ">
        <RecentTravelsList />
      </div>
    </div>
  )
}

export default HomePage