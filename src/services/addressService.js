import instance from "../api";

export default class housingStockService {
  static async getStreetsList() {
    return instance.get('/Request/streets')
  }
  static async getHousesList(id) {
    return instance.get(`/Request/houses/${id}`)
  }
  static async getFlatsList(id) {
    return instance.get(`/Request/house_flats/${id}`)
  }
}
