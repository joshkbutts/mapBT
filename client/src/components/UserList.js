import React from 'react'
import UserTile from './UserTile'

const UserList = (props) => {
  return (
    <div>
      <h1 className="subheader text-center">
        current users
      </h1>

      <div>
        <UserTile />
        <UserTile />
        <UserTile />
        <UserTile />
        <UserTile />
        <UserTile />
      </div>

    </div>
  )
}

export default UserList