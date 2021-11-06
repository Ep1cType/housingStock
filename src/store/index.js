import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import addressReducer from "./address/addressReducer";
import housingStockReducer from "./housingStock/housingStockReducer";


let reducers = combineReducers({
  address: addressReducer,
  housingStock: housingStockReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
