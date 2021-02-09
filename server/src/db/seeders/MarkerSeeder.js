import { Marker, User } from "../../models/index.js"

class MarkerSeeder {
  static async seed() {
    const user1 = await User.query().findById(1)
    const user2 = await User.query().findById(2)
    const markersData = [
      {
        lat: "43.5117",  
        lng: "-71.2873", 
        title: "Mount Major", 
        description: "This place is awesome. Great hike!", 
        userId: user1.id
      },
      {
        lat: "42.8435",  
        lng: "-70.8168", 
        title: "Salisbury Beach", 
        description: "Can't forget the classics! Great on a hot day!", 
        userId: user1.id
      },
      {
        lat: "40.6782",  
        lng: "-73.9442", 
        title: "Brooklyn NY", 
        description: "One of my favorite cities!", 
        userId: user2.id
      },
      {
        lat: "34.0522",  
        lng: "-118.2437", 
        title: "Los Angeles CA", 
        description: "One of my favorite cities to vacation to.", 
        userId: user2.id
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