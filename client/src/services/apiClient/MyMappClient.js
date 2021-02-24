import getMap from './requests/getMap'
import postTravel from './requests/postTravel'
import deleteTravel from './requests/deleteTravel'
import editMarker from './requests/editMarker'

import getComments from './requests/comments/getComments'
import postComment from './requests/comments/postComment'

class MyMappClient {
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
}

export default MyMappClient