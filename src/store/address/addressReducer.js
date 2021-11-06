import {SET_FLATS_LIST, SET_HOUSES_LIST, SET_HOUSING_STOCK_LIST, SET_STREETS_LIST} from "./housingStockTypes";


let initialState = {
  housingStockList: [],
  streetsList: [],
  housesList: [],
  flatsList: [],
  isLoading: false,
  error: "",
};

const housingStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOUSING_STOCK_LIST: {
      return {
        ...state,
        housingStockList: action.payload,
      };
    }
    case SET_STREETS_LIST: {
      return {
        ...state,
        streetsList: action.payload,
      };
    }
    case SET_HOUSES_LIST: {
      return {
        ...state,
        housesList: action.payload,
      };
    }
    case SET_FLATS_LIST: {
      return {
        ...state,
        flatsList: action.payload,
      };
    }
    default:
      return state;
  }
}

export default housingStockReducer;
