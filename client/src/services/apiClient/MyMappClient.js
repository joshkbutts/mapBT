import getMap from './requests/getMap'

class MyMappClient {
  static async getMap(id) {
    return getMap(id)
  }
}

export default MyMappClient