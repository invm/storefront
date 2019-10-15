import {
  ADD_STORE,
  DELETE_STORE,
  UPDATE_STORE,
  STORE_ERROR,
  CLEAR_STORES,
  ADD_ORDER,
  UPDATE_ORDER,
  GET_PRODUCTS,
  GET_STORES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case CLEAR_STORES:
      return {
        ...state,
        loading: false,
        stores: null
      };
    case GET_STORES:
      return {
        ...state,
        stores: action.payload.stores,
        loading: false
      };
    case STORE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ADD_STORE:
      return {
        ...state,
        stores: action.payload,
        loading: false
      };
    case DELETE_STORE:
      return {
        ...state,
        loading: false,
        stores: [...state.stores.filter(store => store._id !== action.payload)]
      };
    case UPDATE_STORE:
      return {
        ...state,
        loading: false,
        stores: [
          ...state.stores.map(store => {
            if (store._id === action.payload.id) {
              return action.payload.store;
            }
            return store;
          })
        ]
      };
    case ADD_ORDER:
      return {
        ...state,
        loading: false,
        stores: [
          ...state.stores.map(store => {
            if (store._id === action.payload.id) {
              store.orders.push(action.payload.order);
              return action.payload.store;
            }
            return store;
          })
        ]
      };
    case UPDATE_ORDER:
      return {
        ...state,
        loading: false,
        stores: [
          ...state.stores.map(store => {
            if (store._id === action.payload.id) {
              store.orders.map(order => {
                if (order._id === action.payload.order._id) {
                  return action.payload.order;
                }
                return order;
              });
              return action.payload.store;
            }
            return store;
          })
        ]
      };
    default:
      return state;
  }
};
