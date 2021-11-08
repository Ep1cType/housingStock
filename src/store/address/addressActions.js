import {SET_ERROR, SET_FLATS_LIST, SET_HOUSES_LIST, SET_IS_LOADING, SET_STREETS_LIST} from "./addressTypes";
import addressService from "../../services/addressService";

export const addressActions = {
  setStreetsList: (payload) => ({type: SET_STREETS_LIST, payload }),
  setHousesList: (payload) => ({type: SET_HOUSES_LIST, payload}),
  setFlatsList: (payload) => ({type: SET_FLATS_LIST, payload}),
  setIsLoading: (payload) => ({type: SET_IS_LOADING, payload}),
  setError: (payload) => ({type: SET_ERROR, payload}),
  fetchStreets: () => async (dispatch) => {
    try {
      dispatch(addressActions.setIsLoading(true))
      const response = await addressService.getStreetsList();
      const mockStreetsList = response.data.filter((street) => street.cityId === 1);
      dispatch(addressActions.setStreetsList(mockStreetsList));
    } catch (e) {
      dispatch(addressActions.setError("Произошла ошибка"))
    } finally {
      dispatch(addressActions.setIsLoading(false))
    }
  },
  fetchHouses: (streetId) => async (dispatch) => {
    try {
      const response = await addressService.getHousesList(streetId);
      dispatch(addressActions.setHousesList(response.data));
    } catch (e) {

    } finally {

    }
  },
  fetchFlats: (houseId) => async (dispatch) => {
    try {

      const response = await addressService.getFlatsList(houseId);
      dispatch(addressActions.setFlatsList(response.data))
    } catch (e) {

    } finally {

    }
  }
};
