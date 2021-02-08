import { Marker, User } from "../../models/index.js"

class MarkerSeeder {
  static async seed() {
    const user = await User.query().findById(1)
    const markersData = [
      {
        lat: "-25.363",  
        lng: "131.044", 
        title: "yo this place crazy", 
        description: "am i upside down right now?!", 
        userId: user.id
      },
      {
        lat: "-24.400",  
        lng: "130", 
        title: "yo this place crazy", 
        description: "am i upside down right now?!", 
        userId: user.id
      }
    ]

    for (const singleMarkerData of markersData) {
      const currentMarker = await Marker.query().findOne(singleMarkerData)
      if (!currentMarker) {
        await Marker.query().insert(singleMarkerData)
      }
    }
  }
}

export default MarkerSeeder