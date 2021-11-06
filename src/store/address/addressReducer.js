import {SET_FLATS_LIST, SET_HOUSES_LIST, SET_STREETS_LIST} from "./addressTypes";


let initialState = {
  streetsList: [],
  housesList: [],
  flatsList: [],
  isLoading: false,
  error: "",
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
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
};

export default addressReducer;
