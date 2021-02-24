import getUserMaps from './requests/getUserMaps'
import getMap from './requests/getMap'
import postTravel from './requests/postTravel'
import deleteTravel from './requests/deleteTravel'
import editMarker from './requests/editMarker'
import getComments from './requests/comments/getComments'
import postComment from './requests/comments/postComment'
import fetchMarker from './requests/fetchMarker'

class MyMappClient {
  static async getUserMaps() {
    return getUserMaps()
  }

  static async getMap(id) {
    return getMap(id)
  }

  static async postTravel(newMarkerData, id) {
    return postTravel(newMarkerData, id)
  }

  static async deleteTravel(markerData) {
    return deleteTravel(markerData)
  }

  static async editMarker(markerData, id) {
    return editMarker(markerData, id)
  }

  static async getComments(id) {
    return getComments(id)
  }

  static async postComment(newCommentData, id) {
    return postComment(newCommentData, id)
  }

  static async fetchMarker(id) {
    return fetchMarker(id)
  }
}

export default MyMappClient