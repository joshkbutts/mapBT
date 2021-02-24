import React, { useState, useEffect } from 'react'
import UserTile from './UserTile'
import { Link } from 'react-router-dom'
import MyMappClient from '../services/apiClient/MyMappClient'

const UserList = (props) => {
  const [maps, setMaps] = useState([])

  const getUserMaps = async () => {
      const body = await MyMappClient.getUserMaps()
      setMaps(body.maps)
  }

  useEffect(() => {
    getUserMaps()
  }, [])

  const userMapTiles = maps.map(map => {
    return (
      <Link to={`/my-map/${map.id}`} key={map.id}>
        <UserTile
          key={map.id}
          map={map}
        />
      </Link>
    )
  })

  return (
    <div>
      <h1 className="subheader text-center">
        users
      </h1>

      <nav>
        {userMapTiles.reverse()}
      </nav>
    </div>
  )
}

export default UserList