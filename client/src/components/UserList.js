import React, { useState, useEffect } from 'react'
import UserTile from './UserTile'

const UserList = (props) => {
  const [maps, setMaps] = useState([])

  const getUserMaps = async () => {
    try {
      const response = await fetch('/api/v1/my-map')
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const mapsBody = await response.json()
      setMaps(mapsBody.maps)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getUserMaps()
  }, [])

  const userMapTiles = maps.map(map => {
    return (
      <UserTile
        key={map.id}
        map={map}
      />
    )
  })

  return (
    <div>
      <h1 className="subheader text-center">
        current users
      </h1>

      <div>
        {userMapTiles}
      </div>

    </div>
  )
}

export default UserList