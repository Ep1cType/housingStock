import instance from "../api";

export default class housingStockService {
  static async getHousingStock(queryName, id) {
    return instance.get(`/HousingStock?${queryName}=${id}`)
  }
  static async getClientsList(addressId) {
    return instance.get(`/HousingStock/clients?addressId=${addressId}`)
  }
  static async postClient(client) {
    return instance.post('/HousingStock/client', client)
  }
  static async bindClient(addressId, clientId) {
    return instance.put('/HousingStock/bind_client', {
      addressId,
      clientId
    })
  }
  static async deleteBindClient(clientId) {
    return instance.delete(`/HousingStock/bind_client/${clientId}`)
  }
  static async editClient(newClient) {
    return instance.post(`/HousingStock/client`, newClient)
  }
}
