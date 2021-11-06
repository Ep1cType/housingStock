import {
  ADD_NEW_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  SET_CLIENTS_LIST,
  SET_HOUSING_STOCK,
  SET_IS_LOADING, SET_PER_PAGE, SET_TOTAL_COUNT
} from "./housingStockTypes";
import housingStockService from "../../services/housingStockService";

export const housingStockActions = {
  setHousesStock: (payload) => ({type: SET_HOUSING_STOCK, payload}),
  addClient: (payload) => ({type: ADD_NEW_CLIENT, payload}),
  editingClient: (payload) => ({type: EDIT_CLIENT, payload}),
  setTotalCount: (payload) => ({type: SET_TOTAL_COUNT, payload}),
  deletingClient: (payload) => ({type: DELETE_CLIENT, payload}),
  setPerPage: (payload) => ({type: SET_PER_PAGE, payload}),
  setClientsList: (payload) => ({type: SET_CLIENTS_LIST, payload}),
  setIsLoading: (payload) => ({type: SET_IS_LOADING, payload}),
  fetchHousesStock: (queryName, id) => async (dispatch) => {
    try {
      const response = await housingStockService.getHousingStock(queryName, id);
      console.log(response.data);
      dispatch(housingStockActions.setHousesStock(response.data))
      dispatch(housingStockActions.setTotalCount(response.data.length));
    } catch (e) {

    } finally {

    }
  },
  fetchClientsList: (addressId) => async (dispatch) => {
    try {
      dispatch(housingStockActions.setIsLoading(true))
      const response = await housingStockService.getClientsList(addressId);
      console.log(response.data);
    } catch (e) {

    } finally {
      dispatch(housingStockActions.setIsLoading(false))
    }
  },
  postClient: (client, addressId) => async (dispatch) => {
    try {
      const response = await housingStockService.postClient(client)
      console.log("Респонс поста клиента", response)
      console.log("Пост Клиента", response.data)
      const {id} = response.data;
      dispatch(housingStockActions.bindClient(addressId, id, client))
    } catch (e) {
      console.log("Ошибочка",e);
      console.log("сообщение ошибочки", e.message)
    } finally {

    }
  },
  bindClient: (addressId, clientId, client) => async (dispatch) => {
    try {
      const response = await housingStockService.bindClient(addressId, clientId);
      console.log("Респонс бинда клиента", response);
      console.log("Бинд клиента", response.data);
      dispatch(housingStockActions.addClient({client, addressId}))
    } catch (e) {
      console.log("Ошибочка бинда",e);
      console.log("сообщение ошибочки бинда", e.message)
    } finally {
    }
  },
  deleteClient: (addressId, clientId) => async (dispatch) => {
    try {
      const response = await housingStockService.deleteBindClient(clientId);
      console.log('Удаление', response);
      console.log('Подробности удаления', response.data)
      dispatch(housingStockActions.deletingClient({addressId ,clientId}))
    } catch (e) {
      console.log("Ошибочка удаления",e);
      console.log("сообщение ошибочки удаления", e.message)
    } finally {

    }
  },
  editClient: (newClient, addressId) => async (dispatch) => {
    try {
      const response = await housingStockService.editClient(newClient);
      const {} = response.data
      console.log("Успешное редактирование",response.data)
      dispatch(housingStockActions.editingClient({newClient, addressId}))
    } catch (e) {

    } finally {

    }
  }
}
