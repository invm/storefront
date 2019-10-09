import {
  ADD_STORE,
  DELETE_STORE,
  UPDATE_STORE,
  FILTER_STORES,
  CLEAR_FILTER,
  ADD_ORDER,
  UPDATE_ORDER
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_STORE:
      return {
        ...state,
        stores: [...state.stores, action.payload]
      };
    case DELETE_STORE:
      return {
        ...state,
        stores: [...state.stores.filter(store => store._id !== action.payload)]
      };
    case UPDATE_STORE:
      return {
        ...state,
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
    case ADD_ORDER:
      return {
        ...state,
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
