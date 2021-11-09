import {
  ADD_NEW_CLIENT,
  DELETE_CLIENT,
  EDIT_CLIENT,
  SET_CLIENTS_LIST,
  SET_HOUSING_STOCK, SET_IS_ERROR,
  SET_IS_LOADING, SET_PER_PAGE, SET_TOTAL_COUNT
} from "./housingStockTypes";

let initialState = {
  housingStock: [],
  clientsList: [],
  isLoading: false,
  isError: "",
  perPage: 10,
  totalCount: 0,
};

const housingStockReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HOUSING_STOCK: {
      return {
        ...state,
        housingStock: action.payload,
      };
    }
    case SET_CLIENTS_LIST: {
      return {
        ...state,
        clientsList: action.payload,
      };
    }
    case SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case ADD_NEW_CLIENT: {
      debugger;
      return {
        ...state,
        housingStock: state.housingStock.map((el) => (el.addressId === action.payload.addressId ? {
          ...el,
          clients: [...el.clients, action.payload.client]
        } : el))
      }
    }
    case DELETE_CLIENT: {
      return {
        ...state,
        housingStock: state.housingStock.map((el) => (el.addressId === action.payload.addressId ? {
          ...el,
          clients: el.clients.filter((elem) => elem.bindId !== action.payload.clientId)
        } : el))
      }
    }
    case EDIT_CLIENT: {
      return {
        ...state,
        housingStock: state.housingStock.map((el) => (el.addressId === action.payload.addressId ? {
          ...el,
          clients: el.clients.map((elem) => (elem.id === action.payload.newClient.id ? action.payload.newClient : elem))
        } : el))
      }
    }
    case SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.payload
      };
    }
    case SET_PER_PAGE: {
      return {
        ...state,
        perPage: action.payload
      };
    }
    case SET_IS_ERROR: {
      return {
        ...state,
        isError: action.payload
      };
    }
    default:
      return state;
  }
};

export default housingStockReducer;
