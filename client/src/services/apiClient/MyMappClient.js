import getMap from './requests/getMap'
import postTravel from './requests/postTravel'

class MyMappClient {
  static async getMap(id) {
    return getMap(id)
  }

  static async postTravel(newMarkerData, id) {
    return postTravel(newMarkerData, id)
  }
}

export default MyMappClient