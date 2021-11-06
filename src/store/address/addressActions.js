import {SET_ERROR, SET_FLATS_LIST, SET_HOUSES_LIST, SET_IS_LOADING, SET_STREETS_LIST} from "./housingStockTypes";
import housingStockService from "../../services/housingStockService";

export const housingStockActions = {
  setStreetsList: (payload) => ({type: SET_STREETS_LIST, payload }),
  setHousesList: (payload) => ({type: SET_HOUSES_LIST, payload}),
  setFlatsList: (payload) => ({type: SET_FLATS_LIST, payload}),
  setIsLoading: (payload) => ({type: SET_IS_LOADING, payload}),
  setError: (payload) => ({type: SET_ERROR, payload}),
  fetchStreets: () => async (dispatch) => {
    debugger;
    try {
      dispatch(housingStockActions.setIsLoading(true))
      const response = await housingStockService.getStreetsList();
      const mockStreetsList = response.data.filter((street) => street.cityId === 1);
      console.log(mockStreetsList);
      dispatch(housingStockActions.setStreetsList(mockStreetsList));
    } catch (e) {
      dispatch(housingStockActions.setError("Произошла ошибка"))
    } finally {
      dispatch(housingStockActions.setIsLoading(false))
    }
  },
  fetchHouses: (streetId) => async (dispatch) => {
    debugger;
    try {
      dispatch(housingStockActions.setIsLoading(true));
      const response = await housingStockService.getHousesList(streetId);
      console.log(response.data);
      dispatch(housingStockActions.setHousesList(response.data));
    } catch (e) {

    } finally {
      dispatch(housingStockActions.setIsLoading(false))
    }
  },
  fetchFlats: (houseId) => async (dispatch) => {
    try {
      dispatch(housingStockActions.setIsLoading(true));
      const response = await housingStockService.getFlatsList(houseId);
      console.log(response.data);
      dispatch(housingStockActions.setFlatsList(response.data))
    } catch (e) {

    } finally {
      dispatch(housingStockActions.setIsLoading(false))
    }
  }
};
