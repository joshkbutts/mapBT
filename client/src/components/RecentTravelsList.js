import React, { useState, useEffect } from 'react'
import RecentTravelTile from './RecentTravelTile'
import { Link } from 'react-router-dom'

const RecentTravelsList = (props) => {
  const [markers, setMarkers] = useState([])

  const getAllMarkers = async () => {
    try {
      const response = await fetch('/api/v1/markers')
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`
        const error = new Error(errorMessage);
        throw (error)
      }
      const markersBody = await response.json()
      setMarkers(markersBody.markers)

    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getAllMarkers()
  }, [])

  const allRecentTravelTiles = markers.map(marker => {
    return (
      <Link to={`/my-map/${marker.user.id}`}>
      <RecentTravelTile
        key={marker.id}
        user={marker.user.email}
        title={marker.title}
        description={marker.description}
        image={marker.image}
      />
      </Link>
    )
  })

  return (
    <div>
      <h1 className="subheader">
        recent travels
      </h1>
      <nav>
        {allRecentTravelTiles}
      </nav>
    </div>
  )
}

export default RecentTravelsList